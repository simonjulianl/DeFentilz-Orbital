module.exports = (app) => {
  const facilities = require("../controller/facilities.controllers.js");

  var router = require("express").Router();

  // create new facility
  router.post("/", facilities.create);

  // get all the facility
  router.get("/", facilities.findAll);

<<<<<<< HEAD
  // find a single facility with id
  router.get("/:id", facilities.findOne);

  // get all the facility similar to the name
  router.get("/name/:name", facilities.findByName);

  // update a single facility with id
  router.put("/:id", facilities.update);

  // delete a single facility with id
  router.delete("/:id", facilities.delete);
=======
  // get all the facility similar to the name
  router.get("/:name", facilities.findByName);
>>>>>>> origin

  app.use("/api/facilities", router);
};
