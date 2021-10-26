module.exports = app => {
    const email = require("../controllers/nodemailer.controller.js");
    var router = require("express").Router();
  
    // Create a new Poll
    router.post("/", email.sendEmail);

    app.use('/api/email', router);
  };