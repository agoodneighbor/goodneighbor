const express = require("express");
const router = express.Router();

const controller = require("../Controller/mainController");
router.get("/", controller.main);
router.get("/upload",controller.upload);

module.exports = router;
