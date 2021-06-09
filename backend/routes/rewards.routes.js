module.exports = (app) => {
  const rewards = require("../controller/rewards.controllers.js");

  var router = require("express").Router();

  // create new reward
  router.post("/", rewards.create);

  // get all the reward
  router.get("/", rewards.findAll);

  // find a single reward with id
  router.get("/:id", rewards.findOne);

  // update a single reward with id
  router.put("/:id", rewards.update);

  // delete a single reward with id
  router.delete("/:id", rewards.delete);

  app.use("/api/rewards", router);
};
