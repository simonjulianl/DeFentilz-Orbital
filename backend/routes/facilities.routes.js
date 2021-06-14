module.exports = (app) => {
  const facilities = require("../controller/facilities.controllers.js");
  const multer = require("multer");
  const upload = multer({ storage: multer.memoryStorage() });

  const router = require("express").Router();

  // create new facility
  router.post("/", facilities.create);

  // get all the facility
  router.get("/", facilities.findAll);

  // find a single facility with id
  router.get("/:id", facilities.findOne);

  // get all the facility similar to the name
  router.get("/name/:name", facilities.findByName);

  // get all the facility similar to the location
  router.get("/location/:location", facilities.findByLocation);

  // get all the facility by type
  router.get("/type/:type", facilities.findByType);

  // update a single facility with id
  router.put("/:id", facilities.update);

  // delete a single facility with id
  router.delete("/:id", facilities.delete);

  // upload a facility picture to aws s3 bucket
  router.post("/images", upload.single("image"), facilities.postImage);

  app.use("/api/facilities", router);
};
