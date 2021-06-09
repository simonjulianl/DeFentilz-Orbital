module.exports = (app) => {
  const users = require("../controller/users.controllers.js");

  var router = require("express").Router();

  // create new user
  router.post("/", users.create);

  // get all the users
  router.get("/", users.findAll);

  // find a single user with email
  router.get("/:email", users.findByEmail);

  // find users with name
  router.get("/:name", users.findByName);

  // update a single user with email
  router.put("/:email", users.update);

  // delete a single user with email
  router.delete("/:email", users.delete);

  app.use("/api/users", router);
};
