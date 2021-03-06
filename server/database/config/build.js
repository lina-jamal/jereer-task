const { readFileSync } = require("fs");
const { join } = require("path");
const connection = require("./connection");
// Build Function
module.exports = () => {
  const sqlSchema = readFileSync(join(__dirname, "./build.sql")).toString();

  return connection.query(sqlSchema);
};
