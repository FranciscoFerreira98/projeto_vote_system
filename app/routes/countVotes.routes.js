module.exports = app => {
    const countVotes = require("../controllers/countVotes.controller.js");
    var router = require("express").Router();


    // Retrieve all Votes from a id
    router.get("/:id", countVotes.findAll);
    router.get("/all/:id", countVotes.findAndCountAll);
    router.get("/allVoters/:id", countVotes.allVoters)
    app.use('/api/count', router);
}