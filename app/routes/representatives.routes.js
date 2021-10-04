const express = require("express");
const router = express.Router();
const representativesController = require("../controllers/representatives.controller");
const upload = require("../middleware/upload");

let routes = (app) => {
  router.post("/upload", upload.single("file"), representativesController.upload);
  router.get("/representatives", representativesController.getVoters);

  app.use("/api/representatives", router);
};

module.exports = routes;