const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, done) {
			done(null, "static/uploads");
		},
		filename(req, file, done) {
			const ext = path.extname(file.originalname);
			done(null, path.basename(file.originalname, ext + ext));
		},
	}),
	limits: { fileSize: 5 * 1024 * 1024 },
}).array("uploadfile");

const memberController = require("../Controller/MemberController");
const productController = require("../Controller/ProductController");
const { Product } = require("../Model");

router.get("/", memberController.member);
router.post("/api/assign", memberController.asign);
router.post("/api/login", memberController.login);
router.post("/api/logout",memberController.Logout)

router.post("/api/additem", upload, productController.ProductAdd);
router.get("/product", productController.products);

router.get("/test", productController.serchProduct);
router.get("/api/detail/:id", productController.showDetail);
// router.get("/detailProduct", productController.detail);

// #1, 라우트 추가
// router.post("/api/upload", productController.product);
// router.post("/api/mywishlist", productController.wishlist);
// router.post("/api/myorderlist", productController.orderlist);

module.exports = router;
