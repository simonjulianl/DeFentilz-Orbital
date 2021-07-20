const webPush = require("web-push");

const db = require("../models");
const Subscription = db.subscriptions;

const Op = db.Sequelize.Op;
function checkBody(req, res) {
  if (!req.body.userEmail) {
    res.status(400).send({
      message: "userEmail cannot be empty ",
    });
  }
}

exports.create = (req, res) => {
  checkBody(req, res);
  const { subscription, userEmail } = req.body;
  Subscription.create({
    subscription: subscription,
    userEmail: userEmail,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.sqlMessage || "Some error occured while creating the notif",
      });
    });
};

exports.getNotif = (req, res) => {
  const { userEmail } = req.body;
  Subscription.findAll({
    where: {
      userEmail: userEmail,
    },
  })
    .then((subscriptions) =>
      subscriptions.map((subscription) => {
        return webPush.sendNotification(
          subscription.dataValues.subscription,
          JSON.stringify({
            title: "Hello World",
            message: "Success!",
          })
        );
      })
    )
    .then((promises) => Promise.allSettled(promises))
    .then(() => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify({ data: { success: true } }));
    })
    .catch(function (err) {
      console.error(err);
      res.status(500);
      res.setHeader("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          error: {
            id: "unable-to-send-messages",
            message:
              `We were unable to send messages to all subscriptions : ` +
              `'${err.message}'`,
          },
        })
      );
    });
};
