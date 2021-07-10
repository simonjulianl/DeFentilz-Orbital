const dotenv = require("dotenv");
dotenv.config();

// sync with the model if required
// const db = require("./models");
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync the database");
// });

const express = require("express");
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

require("./routes/facilities.routes")(app);
require("./routes/users.routes")(app);
require("./routes/bookings.routes")(app);
require("./routes/rewards.routes")(app);
require("./routes/walletRequests.routes")(app);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is listening at http://localhost:${PORT}`);
});
