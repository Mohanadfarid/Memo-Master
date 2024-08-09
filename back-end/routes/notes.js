const router = require("express").Router();
const notesController = require("../controllers/notes");

router.get("/", notesController.getNotes);
router.get("/:id", notesController.getNote);
router.post("/", notesController.createNote);
router.patch("/:id", notesController.patchNote);
router.delete("/:id", notesController.deleteNote);

module.exports = router;
