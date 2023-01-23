const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const upload = require("express-fileupload");
var cors = require("cors");
const http = require("http");
const port = process.env.PORT 

const app = express();
//=============config file=============
//const config = require("./config");

var server = http.createServer(app);

const apiRouter = require('./routes/userRoute')

app.use('/userapi', apiRouter)

//===============================Connected to MongoDb========================================

var producationString = process.env.DATABASE_URL; //local system database
//  var producationString = "mongodb://" + config.production.username + ":" + config.production.password + "@" + config.production.host + ":" + config.production.port + "/" + config.production.dbName + "?authSource=" + config.production.authDb;
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
var db = mongoose.connect(producationString, function (err) {
  if (err) {
    console.log(err + "connection failed");
  } else {
    console.log("Connected to database ", producationString);
  }
});
//mongo on connection emit
mongoose.connection.on("connected", function (err) {
  console.log("MongoDB connection successful");
  //   require("./services/cronService");
});
//mongo on error emit
mongoose.connection.on("error", function (err) {
  console.log("MongoDB Error: ", err);
});
//mongo on dissconnection emit
mongoose.connection.on("disconnected", function () {
  console.log("mongodb disconnected and trying for reconnect");
});

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set("port", port)

server.listen(app.get("port"), function (err) {
    if (err) {
      throw err;
    } else {
      console.log("Server is running at " + app.get("port"));
      // console.log("url:", url);
    }
  });
  server.timeout = 5000000;

// DATABASE_URL = 'mongodb://localhost:27017/crudApp'
// PORT = 3600
// SECRET_KEY = "hyrgqwjdfbw4534efqrwer2q38945765"