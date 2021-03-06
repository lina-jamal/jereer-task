const router = require("express").Router();
router.get("/hh", (req, res) => {
  res.json("hi");
});

module.exports = router;
