const bcrypt = require("bcrypt");
const Boom = require("@hapi/boom");
const admin = require("firebase-admin");
const userQueries = require("../database/queries/userQueries");
// const jwtFunction = require("../middlewares/jwt");
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(
      Buffer.from(process.env.FIREBASE_CRED, "base64").toString("ascii")
    )
  ),
});

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
      // const token = await jwtFunction.signToken({
      //   email: user.email,
      //   name: user.name,
      //   id: user.id,
      // });
      const userToken = admin.auth().createCustomToken("userId-" + user.id);

      // res
      //   .cookie("token", token, { httpOnly: true })
      //   .status(200)
      res.json({ status: 200, userToken, message: "logged in successfully" });
    } catch (err) {
      next(err);
    }
  },
  updateUserData: async (req, res, next) => {
    try {
      const { name, phone } = req.body;
      const { id: userId } = req.user;
      console.log(name, phone);
      await userQueries.updateUser({
        userId,
        name,
        phone,
      });
      return res.json({
        statusCode: 200,
        message: "user updated Successfully",
      });
    } catch (error) {
      return next(error);
    }
  },
  logout: (req, res, next) => {
    try {
      return res
        .clearCookie("token")
        .json({ statusCode: 200, message: "Logout successfully" });
    } catch (error) {
      return next(error);
    }
  },
};
module.exports = userCtrl;
