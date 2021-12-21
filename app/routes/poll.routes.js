module.exports = app => {
    const polls = require("../controllers/poll.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Poll
    router.post("/", polls.create);
  
    // Retrieve all Polls
    router.get("/", polls.findAll);
  
    // Retrieve a single Poll with id
    router.get("/:id", polls.findOne);
  
    // Update a Poll with id
    router.put("/:id", polls.update);
  
    // Delete a Poll with id
    router.delete("/:id", polls.delete);
  
    // Delete all Polls
    router.delete("/", polls.deleteAll);
  
    app.use('/api/polls', router);
    
  };