const Boom = require("@hapi/boom");
const jwtFunction = require("./jwt");

const Auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(Boom.unauthorized("You are not registered yet"));
  try {
    req.user = await jwtFunction.verifyToken(token);
    next();
  } catch (err) {
    return next(Boom.unauthorized("You are not Authorized"));
  }
};

module.exports = Auth;
