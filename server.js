const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


global.__basedir = __dirname + "/..";

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// database
const db = require("./app/models");
const Role = db.role;


db.sequelize.sync();
// force: true will drop the table if it already exists
//db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
//});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Está a funcionar." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/voter.routes')(app);
require('./app/routes/poll.routes')(app);
require('./app/routes/representatives.routes')(app);
require('./app/routes/vote.routes')(app);
require('./app/routes/countVotes.routes')(app);
require('./app/routes/nodemailer.routes')(app);
//require('./app/routes/schedule.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "mesa"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });

}