const express = require("express");
const path = require("path");
const router = express.Router();

const multer = require("multer");
const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, done) {
			done(null, "static/uploads");
		},
		filename(req, file, done) {
			var mimeType;

			switch (file.mimetype) {
				case "image/jpeg":
					mimeType = "jpg";
					break;
				case "image/png":
					mimeType = "png";
					break;
				case "image/gif":
					mimeType = "gif";
					break;
				case "image/bmp":
					mimeType = "bmp";
					break;
				default:
					mimeType = "jpg";
					break;
			}
			const ext = path.extname(file.originalname);
			console.log(file.originalname);
			console.log(path.basename(file.originalname, ext) + "." + mimeType);
			done(null, path.basename(file.originalname, ext) + "." + mimeType);
		},
		// fileFilter: fileFilter,
	}),
	limits: { fileSize: 5 * 1024 * 1024 },
}).array("uploadfile");

const memberController = require("../Controller/MemberController");
const productController = require("../Controller/ProductController");
const chatController=require("../Controller/ChatController");

router.get("/takeroom",chatController.takeChat);
router.get("/takechatlist",chatController.takeRoomList);
router.get("/takecontent",chatController.takeChatContant);
router.post("/storechat",chatController.storeChat);


router.post("/assign", memberController.asign);
router.post("/login", memberController.login);
router.get("/logout", memberController.Logout);
router.post("/additem", upload, productController.ProductAdd);

router.post("/like", productController.DoJimm);
router.post("/checkJimm", productController.checkJimm);

module.exports = router;
