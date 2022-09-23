const express = require("express");
const router = express.Router();

const controller = require("../Controller/MemberController");

router.get("/", controller.member);
router.post("/api/assign", controller.asign);
// router.post("/api/loadadress", controller.roadaddress);

module.exports = router;
