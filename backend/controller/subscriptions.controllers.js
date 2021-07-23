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
  const { endpoint, keys, userAgent, userEmail } = req.body;
  Subscription.create({
    endpoint: endpoint, 
    keys: keys,
    userAgent: userAgent,
    userEmail: userEmail
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500)
    .send({
      message: err.sqlMessage || "Some error occured while creating the booking"
    })
  });
};

exports.getNotif = (req, res) => {
  const { userEmail } = req.body;
  Subscription.findAll({
    where: {
      userEmail: userEmail
    }
  }).then(subscriptions => {
    return subscriptions.map(subscription =>
      {
        const subObj = {
          endpoint: subscription.dataValues.endpoint,
          keys: {
            auth: subscription.dataValues.keys.auth,
            p256dh: subscription.dataValues.keys.p256dh
          }
        };
        return webPush.sendNotification(subObj,
          JSON.stringify({
            title: "Hello!", 
            message: "This is how you will be notified!"
            })
          );
      });
    }
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

exports.delete = (req, res) => {
  Subscription.destroy({
    where: {
      endpoint: req.body.endpoint
    }
  })
    .then(() => res.send("Success"))
    .catch(function(err) {
      console.error(err);
      res.status(500);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        error: {
          id: 'unable-to-send-messages',
          message: `We were unable to send messages to all subscriptions : ` +
            `'${err.message}'`
        }
      }));
    });
}
