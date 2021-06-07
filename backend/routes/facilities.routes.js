module.exports = (app) => {
  const facilities = require("../controller/facilities.controllers.js");

  var router = require("express").Router();

  // create new facility
  router.post("/", facilities.create);

  // get all the facility
  router.get("/", facilities.findAll);

  // get all the facility similar to the name
  router.get("/:name", facilities.findByName);

  app.use("/api/facilities", router);
};
