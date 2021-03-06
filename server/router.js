const router = require("express").Router();
// const admin=require("firebase-admin");
const userCtrl = require("./controller/userCtrl");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.use((req, res) => {
  res.status(404).json({ statusCode: 404, message: "page not found" });
});
router.use((req, res) => {
  (err, req, res, next) => {
    const message = err.message || "internal server error";
    const status = err.output ? err.output.statusCode : 500;

    res.status(status).json({ statusCode: status, message });
  };
});

module.exports = router;
