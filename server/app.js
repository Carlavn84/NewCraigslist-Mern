const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const controller = require("./controller");
var cookieParser = require('cookie-parser');

const app = express();

app.use(bodyparser.json());

mongoose.connect("mongodb://min:min123@ds125472.mlab.com:25472/craigslistmern", { useNewUrlParser: true });


app.use(
  cors({
    origin: [
      "http://localhost:3000"],
    methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true //allow setting of cookies
  })
);

app.use(cookieParser());
app.use(session({
    secret: "venice12345",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60000 * 30 }
  })
);

controller(app);

app.listen(process.env.PORT || 8000, () => console.log("Listening to the port 8000"));