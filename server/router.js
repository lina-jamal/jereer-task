const router = require("express").Router();
// const admin=require("firebase-admin");
const userCtrl = require("./controller/userCtrl");
const Auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.use(Auth);

router.use(errorHandler.clientError);
router.use(errorHandler.serverError);

module.exports = router;
