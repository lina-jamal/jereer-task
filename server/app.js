require("dotenv").config();
const express = require("express");
const { join } = require("path");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const router = require("./router");

const app = express();

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

app.use(middlewares);
app.use("/api/v1/", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "..", "client", "build")));
  app.all("*", (req, res) => {
    res.sendFile(join(__dirname, "..", "client", "build", "index.html"));
  });
}
app.use((req, res) => {
  res.status(404).json({ statusCode: 404, message: "page not found" });
});
app.use((req, res) => {
  res.status(500).json({ statusCode: 500, message: "internal server error" });
});
module.exports = app;
