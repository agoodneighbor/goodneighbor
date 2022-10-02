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

exports.takeRoomList=async(req,res)=>{
    const result=await ChatRoom.findAll();
    console.log(result);
    let takeroom=[];
    let check="("+String(req.session.user)+")";
    for (let i of result){
        console.log(i.dataValues);
        if(i.dataValues.room_name.indexOf(check) !== -1){
            takeroom.push(i.dataValues);
        }
    }
    console.log(takeroom);
    res.send(takeroom);
}

exports.storeChat= async (req,res)=>{

}

exports.takeChat= async (req,res)=>{
    let isroomexist=false;
    let roomName=""
    console.log("roomname:",req.query.member_id);
    if(Number(req.query.member_id)>Number(req.session.user)){
        roomName="("+String(req.session.user)+")"+"+"+"("+String(req.query.member_id)+")";
    }
    else{
        roomName="("+String(req.query.member_id)+")"+"+"+"("+String(req.session.user)+")";
    }
    const result=await ChatRoom.findAll({
        where: { room_name: roomName },
    })
    //console.log(result);
    if(result.length==0){
        const makeroom=await ChatRoom.create({
            room_name:roomName
        })
        //console.log(makeroom)
    }else{
        isroomexist=true;
    }
    res.send(roomName);
}