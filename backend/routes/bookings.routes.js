module.exports = (app) => {
  const bookings = require("../controller/bookings.controllers.js");

  var router = require("express").Router();

  // create new booking
  router.post("/", bookings.create);

  // get all the bookings
  router.get("/", bookings.findAll);

  // get a single booking with id
  router.get("/:id", bookings.findOne);

  // find bookings with userEmail
  router.get("/user/:userEmail", bookings.findByUserEmail);

  // find bookings with facilityId
  router.get("/facility/:facilityId", bookings.findByFacilityId);

  // update a single booking with id
  router.put("/:id", bookings.update);

  // delete a single booking with id
  router.delete("/:id", bookings.delete);

  app.use("/api/bookings", router);
};
