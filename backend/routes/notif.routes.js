module.exports = (app) => {
  const notif = require("../controller/notif.controllers.js");

  const router = require("express").Router();

  // create new booking
  router.post("/", notif.create);

  app.use("/api/notif", router);
};