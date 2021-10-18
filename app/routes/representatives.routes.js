const express = require("express");
const router = express.Router();
const representativesController = require("../controllers/representatives.controller");
const upload = require("../middleware/upload");

let routes = (app) => {
  router.post("/upload", upload.single("file"), representativesController.upload);
  router.get("/", representativesController.getRepresentatives);
  router.get("/name/", representativesController.getRepresentativeByName);
  router.get("/:id", representativesController.getRepresentativeById);
  router.delete("/:id", representativesController.deleteRepresentative);
  app.use("/api/representatives", router);
};

module.exports = routes;