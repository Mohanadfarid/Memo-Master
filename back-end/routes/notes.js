const router = require("express").Router();
router.get("/notes", (req, res) => {
  res.send("the is a simple funciton to test the notes endpoint");
});
module.exports = router;
