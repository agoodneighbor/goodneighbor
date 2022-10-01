const { Model } = require("sequelize");
const {
	Product,
	WishList,
	OrderList,
	Member,
	Address,
	ImgUrl,
    ChatRoom,
    ChatContent
} = require("../Model");
const sequelize = require("sequelize");
const session = require("express-session");
const Op = sequelize.Op;


exports.storeChat= async (req,res)=>{

}

exports.takeChat= async (req,res)=>{
    let roomName=""
    if(Number(req.query.product_id)>Number(req.session.user)){
        roomName=String(req.session.user)+"+"+String(req.query.product_id);
    }
    else{
        roomName=String(req.query.product_id)+"+"+String(req.session.user);
    }
    const result=await ChatRoom.findAll({
        where: { room_name: roomName },
    })
    console.log(result);
    if(result.length==0){
        const makeroom=await ChatRoom.create({
            room_name:roomName
        })
        console.log(makeroom)
    }else{
        res.send(false);
    }
}