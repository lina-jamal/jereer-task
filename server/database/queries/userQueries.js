const connection = require("../config/connection");

const userQueries = {
  getUserByEmail: (email) =>
    connection.query({
      text: "SELECT * FROM users WHERE email = $1;",
      values: [email],
    }),

  addUser: ({ name, email, password, phone }) => {
    const sql = {
      text:
        "INSERT INTO users  (name,email,password,phone) VALUES($1,$2,$3,$4) RETURNING name ",
      values: [name, email, password, phone],
    };
    return connection.query(sql);
  },
  updateUser: ({ userId, name, phone }) => {
    const sql = {
      text: "UPDATE users SET name = $1, phone = $2 WHERE id = $3;",
      values: [name, phone, userId],
    };
    return connection.query(sql);
  },
};
module.exports = userQueries;
