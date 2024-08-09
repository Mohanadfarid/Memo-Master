const router = require("express").Router();
const usersController = require("../controllers/users");

router.get("/:id", usersController.getUser);
router.post("/login", usersController.postLogin);
router.post("/registration", usersController.postRegistration);
router.patch("/:id", usersController.patchUser);
router.delete("/:id", usersController.deleteUser);
module.exports = router;
