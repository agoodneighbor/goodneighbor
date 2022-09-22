const express = require("express");
const router = express.Router();

const controller = require("../Controller/MemberController");

router.get("/", controller.member);
router.get("/memberinfo", controller.get_visitors);

module.exports = router;
