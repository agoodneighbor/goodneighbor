const express = require("express");
const router = express.Router();

const memberController = require("../Controller/MemberController");
const productController = require("../Controller/ProductController");

router.get("/", memberController.member);
router.post("/api/assign", memberController.asign);
router.post("/api/login", memberController.login);

// #1, 라우트 추가
// router.post("/api/upload", productController.product);
// router.post("/api/mywishlist", productController.wishlist);
// router.post("/api/myorderlist", productController.orderlist);

module.exports = router;
