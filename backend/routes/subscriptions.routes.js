module.exports = (app) => {
    const subscription = require("../controller/subscriptions.controllers.js");
  
    const router = require("express").Router();
  
    // create new subscription
    router.post("/", subscription.create);

    // delete one subscription by endpoint
    router.delete("/", subscription.delete);

    // get Notification
    router.post("/notifs", subscription.getNotif);
  
    app.use("/api/subscriptions", router);
  };