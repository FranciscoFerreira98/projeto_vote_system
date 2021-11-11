module.exports = app => {
    const schedules = require("../controllers/schedule.controller.js");
    var router = require("express").Router();
  

    app.use('/api/schedule', router);
  };