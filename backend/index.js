const dotenv = require("dotenv");
dotenv.config();

// sync with the model if required
const db = require("./models");
const { Op } = require("sequelize");

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync the database");
// }).catch((err) => console.error(err.message));

const express = require("express");
const moment = require('moment');

const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000; // heroku port

const corsOptions = {
  // for extension
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// parse request of content type
app.use(express.json());

// parse request from urlencoded
app.use(express.urlencoded({ extended: true }));

// home page api
app.get("/", (req, res) => res.json({ message: "Welcome to BoNUS Server" }));

const webPush = require("web-push");
const webPushConfig = require("./config/webpush.config");
webPush.setVapidDetails(
  webPushConfig.WEB_PUSH_EMAIL,
  webPushConfig.WEB_PUSH_PUBLIC_KEY,
  webPushConfig.WEB_PUSH_PRIVATE_KEY
);

require("./routes/facilities.routes")(app);
require("./routes/users.routes")(app);
require("./routes/bookings.routes")(app);
require("./routes/rewards.routes")(app);
require("./routes/walletRequests.routes")(app);
require("./routes/subscriptions.routes")(app);

// Setting up Cron Job for Notifications
const cron = require('node-cron');
const Facilities = db.facilities;
const Bookings = db.bookings;
const Subscriptions = db.subscriptions;

cron.schedule("*/1 * * * * ", () => {
  console.log("---------------------------");
  console.log("Sending Notifications!");
  Bookings.findAll({
    where: {
      startingTime: {
        [Op.between]: [moment().add('10', 'minutes').toDate(), moment().add('11', 'minutes').toDate()]
      }
    }
  })
  .then(bookings => bookings.map(booking => {
    const startTime = moment(booking.dataValues.startingTime);
    const currTime = moment(new Date());
    const timeDiff = startTime.diff(currTime, 'minutes');

    Promise.all([
      Subscriptions.findAll({
        where: {
          userEmail : booking.dataValues.userEmail 
        }
      }),
      Facilities.findOne({
        where: {
          id: booking.dataValues.facilityId
        }
      })
    ])
    .then(values => values[0].map(subscription => {
      const subObj = {
        endpoint: subscription.dataValues.endpoint,
        keys: {
          auth: subscription.dataValues.keys.auth,
          p256dh: subscription.dataValues.keys.p256dh
        }
      };
      return webPush.sendNotification(subObj,
        JSON.stringify({
          title: "Hello! You have a booking in " + timeDiff + " Minutes", 
          message: "You have a booking on " + startTime.format('LTS') + " at " + values[1].dataValues.name
          })
        );
    }))
    .then(() => console.log("Notif Sent to " + booking.dataValues.userEmail))
  }))
  .then(() => console.log("Done!"))
  .catch((err) => console.error(err));
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is listening at http://localhost:${PORT}`);
});
