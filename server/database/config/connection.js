const { Pool } = require("pg");
// require("dotenv").config();
require("env2")("./config.env");

const { DB_URL, DATABASE_URL, NODE_ENV } = process.env;
console.log(DB_URL);

let dbUrl = "";
switch (NODE_ENV) {
  case "production":
    dbUrl = DATABASE_URL;
    break;
  case "development":
    dbUrl = DB_URL;
    break;
  default:
    throw new Error("No Database url!!!");
}
const options = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

module.exports = new Pool(options);
