const router = require("express").Router();

router.get("/users", (req, res) => {
  res.send("simple get function to test routing");
});
module.exports = router;
