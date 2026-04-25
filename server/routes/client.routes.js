const router = require("express").Router();

const clientController = require("../controllers/client.controller");

router.get("/:phone", clientController.getSaldo);

router.post("/agregar", clientController.addSaldo);

router.post("/quitar", clientController.removeSaldo);

module.exports = router;
