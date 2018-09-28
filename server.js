// the dependencies we need
var express = require('express');
var mongoose = require('mongoose');
var expressHandlebars = require("express-handlebars");
var bodyParser = require('body-parser');

// setup the port to be the host designated port or 8080
var PORT = process.env.PORT || 8080

// Instantiates Express app
var app = express();

//set up Express router
var router = express.Router();

// requires that our routes.js pass our router object
require("./config/routes")(router);

// Disignates "public" as a static directory
app.use(express.static(__dirname + "/public"));

// use handlebars in express
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
// set the the view engine to handlebars
app.set("view engine", "handlebars");

// use bodyparser
app.use(bodyParser.urlencoded({
    extended: false
}));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the Mongo DB
mongoose.connect(db, function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log("mongoose connection established!")
    }
});

//have every request go through the Router middleware
app.use(router);

//listen to the port
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});