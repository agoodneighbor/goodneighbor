const express = require("express");
const router = express.Router();

const memberController = require("../Controller/MemberController");

router.get("/", memberController.member);
router.post("/api/assign", memberController.asign);
// router.post("/api/loadadress", controller.roadaddress);

module.exports = router;
