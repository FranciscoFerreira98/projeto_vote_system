module.exports = app => {
    const countVotes = require("../controllers/countVotes.controller.js");
    var router = require("express").Router();


    // Retrieve all Votes from a id
    router.get("/:id", countVotes.findAll);
    router.get("/all/:id", countVotes.findAndCountAll);
    app.use('/api/count', router);
}