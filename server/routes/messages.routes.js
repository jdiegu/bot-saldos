const express = require("express");
const router = express.Router();

const msgController = require("../controllers/messages.controller");

router.post("/", msgController.processMessage);
router.get("/", msgController.getMessages);
router.get("/:number", msgController.getMessagesByNumber);
router.put("/:id", msgController.updateMsg);
router.delete("/:id", msgController.deleteMsg);

module.exports = router;
