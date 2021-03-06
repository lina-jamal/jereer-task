const router = require("express").Router();

const userCtrl = require("./controller/userCtrl");
const Auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.use(Auth);
router.post("/auth", (req, res) => {
  res.json(req.user);
});
router.patch("/user", userCtrl.updateUserData);
router.get("/logout", userCtrl.logout);
router.use(errorHandler.clientError);
router.use(errorHandler.serverError);

module.exports = router;
