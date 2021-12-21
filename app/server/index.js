const express = require("express");
const app = express();
const routes = require('../routes/');


const server = express();
server.use(express.json());
server.use('/',routes);

    
module.exports = server;