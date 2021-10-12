module.exports = app => {
    const votes = require("../controllers/vote.controller.js");
    var router = require("express").Router();
  
    // Create a new Poll
    router.post("/", votes.create);

    app.use('/api/vote', router);
  };