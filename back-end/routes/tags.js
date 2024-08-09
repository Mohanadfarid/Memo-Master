const router = require("express").Router();
router.get("/tags", (req, res) => {
  res.send("a simple get endpoint to test the tags ");
});
module.exports = router;
