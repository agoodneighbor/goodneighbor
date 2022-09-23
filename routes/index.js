const express = require("express");
const router = express.Router();


const controller = require("../Controller/mainController");
router.get("/", controller.main);
router.get("/upload",controller.upload);
router.get("/product",controller.product)

const memberController = require("../Controller/MemberController");

router.get("/", memberController.member);
router.post("/api/assign", memberController.asign);
// router.post("/api/loadadress", controller.roadaddress);


module.exports = router;
