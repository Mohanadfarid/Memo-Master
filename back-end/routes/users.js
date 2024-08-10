const router = require("express").Router();
const usersController = require("../controllers/users");

router.get("", usersController.getUser);
router.post("/login", usersController.postLogin);
router.post("/registration", usersController.postRegistration);
router.patch("", usersController.patchUser);
router.delete("", usersController.deleteUser);
module.exports = router;
