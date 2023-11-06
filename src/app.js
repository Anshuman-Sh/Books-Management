const express = require("express");
const app = express();
const router = require("./routes/index");
const i18n = require("./middlewares/i18n");
const cors = require("cors");

const passport = require("passport");
const { jwtStrategy } = require("./config/passport");
const bodyParser = require("body-parser");
const { errorHandler, routeNotFoundHandler } = require("./middlewares/common");
const morgan= require("morgan");

app.use(i18n.init);
app.use(morgan("dev"));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enable cors
app.use(cors());
app.options("*", cors());

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/", router);

app.use((req, res, next) => {
  routeNotFoundHandler(req, res, next);
});

app.use(errorHandler);

module.exports = app;
