//requires express and bodyparser
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//Set up port
var PORT = process.env.PORT || 3000;

//express 
var app = express();

//sets router
var router = express.Router();

//routes fil to pass through router object
require("./config/routes")(router);

//uses public folder as static directory
app.use(express.static(__dirname + "/public"));

//handlebars 
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//body parser
app.use(bodyParser.urlencoded({
  extended: false
}));

//requests to go through router
app.use(router);

//use deployed databse or local mongo database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect mongoose to db
mongoose.connect(db, function(error) {
  //log any errors when using mongoose
  if (error) {
    console.log(error);
  }
//or log if successful
else {
  console.log("mongoose connection is successful");
}
});

//Listen on port
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});