// require("dotenv").config();
require("env2")("./config.env");

const express = require("express");
const { join } = require("path");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const router = require("./router");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const cors = require("cors");

app.set("port", process.env.PORT || 5000);

const middlewares = [
  compression(),
  cookieParser(),
  express.urlencoded({ extended: false }),
  express.json(),
];

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  next();
});
app.use(cors());

app.use(middlewares);
app.use("/api/v1/", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "..", "client", "build")));
  app.all("*", (req, res) => {
    res.sendFile(join(__dirname, "..", "client", "build", "index.html"));
  });
}
router.use(errorHandler.clientError);
router.use(errorHandler.serverError);
module.exports = app;
