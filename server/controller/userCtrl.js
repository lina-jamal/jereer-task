const bcrypt = require("bcrypt");
const Boom = require("@hapi/boom");

const userQueries = require("../database/queries/userQueries");
const jwtFunction = require("../middlewares/jwt");

const userCtrl = {
  signup: async (req, res, next) => {
    try {
      const userData = req.body;
      const { email, password } = userData;
      const { rowCount } = await userQueries.getUserByEmail(email);

      if (rowCount > 0) {
        throw Boom.conflict("user already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await userQueries.addUser({
        ...userData,
        password: hashedPassword,
      });
      res.status(201).json({ status: 201, message: "signed up successfully" });
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { rows, rowCount } = await userQueries.getUserByEmail(email);
      if (rowCount === 0) {
        throw Boom.unauthorized("email doesn't exist");
      }

      const user = rows[0];
      const authorized = await bcrypt.compare(password, user.password);
      if (!authorized) {
        throw Boom.unauthorized("invalid password");
      }
      const token = await jwtFunction.signToken({
        email: user.email,
        name: user.name,
        id: user.id,
      });

      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ status: 200, message: "logged in successfully" });
    } catch (err) {
      next(err);
    }
  },
};
module.exports = userCtrl;
