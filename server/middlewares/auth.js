const Boom = require("@hapi/boom");
// const jwtFunction = require("./jwt");
const admin = require("firebase-admin");

const Auth = async (req, res, next) => {
  const { tokenID } = req.body;
  const userId = await admin.auth().verifyIdToken(tokenID);
  // const { token } = req.cookies;
  if (!tokenID) return next(Boom.unauthorized("You are not registered yet"));
  try {
    req.user = userId.split("-")[1];
    next();
  } catch (err) {
    return next(Boom.unauthorized("You are not Authorized"));
  }
};

module.exports = Auth;
