module.exports = (app) => {
  const users = require("../controller/users.controllers.js");
  const multer = require("multer");
  const upload = multer({ storage: multer.memoryStorage() });

  const router = require("express").Router();

  // create new user
  router.post("/", users.create);

  // get all the users
  router.get("/", users.findAll);

  // find a single user with email
  router.get("/:email", users.findByEmail);

  // find users with name
  router.get("/name/:name", users.findByName);

  // update a single user with email
  router.put("/:email", users.update);

  // delete a single user with email
  router.delete("/:email", users.delete);

  // upload a user profile picture to amazon aws s3 bucket
  router.post("/images", upload.single("image"), users.postImage);

  app.use("/api/users", router);
};
