module.exports = (app) => {
  const walletRequests = require("../controller/walletRequests.controller.js");

  const router = require("express").Router();

  // create new wallet request
  router.post("/", walletRequests.create);

  // get all the wallet request
  router.get("/", walletRequests.findAll);

  // find a single wallet request with id
  router.get("/:id", walletRequests.findOne);

  // update a single wallet request with id
  router.put("/:id", walletRequests.update);

  // delete a single wallet request with id
  router.delete("/:id", walletRequests.delete);

  app.use("/api/walletRequests", router);
};
