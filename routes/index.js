const express = require("express");
const multer = require("multer");
const path=require("path")
const router = express.Router();
const upload =multer({
    storage:multer.diskStorage({
        destination(req,file,done){
            done(null,"../static/uploads")
        },
        filename(req,file,done){
            const ext =path.extname(file.originalname);
            done(null,path.basename(file.originalname,ext +ext))
        }
    }),
    limits:{fileSize:5*1024*1024}
})
const memberController = require("../Controller/MemberController");

router.get("/", memberController.member);
router.post("/api/assign", memberController.asign);
// router.post("/api/loadadress", controller.roadaddress);

module.exports = router;
