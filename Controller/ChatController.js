const { Model } = require("sequelize");
const {
    Sequelize,
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

exports.takeRoomList = async (req, res) => {
    const result = await ChatRoom.findAll();
    //console.log(result);
    let takeroom = [];
    let ananta = [];
    let check = "(" + String(req.session.user) + ")";
    for (let i of result) {
        //console.log(i.dataValues);
        if (i.dataValues.room_name.indexOf(check) !== -1) {
            let c = i.dataValues.room_name.replace("+", "").replace(check, "").replace(")", "").replace("(", "")
            console.log("userId", c);
            let name = await Member.findOne({
                where: { member_id: Number(c) }
            })
            console.log(name);
            ananta.push(name.dataValues.user_name);
            takeroom.push(i.dataValues);
        }
    }
    //console.log(takeroom);
    res.send({ takeroom, ananta: ananta });
}

exports.storeChat = async (req, res) => {
    console.log("한번 일어나야되는데 ㅠㅠㅠ")
    const roomid = await ChatRoom.findOne({
        where: { room_name: req.body.roomname }
    })
    ////console.log("roomid", roomid);
    const isexist = await ChatContent.findOne({ where: { room_id: roomid.dataValues.room_id } })
    ////console.log(isexist)

    if (isexist == null) {
        await ChatContent.create({ room_id: Number(roomid.dataValues.room_id), chat_content: String(req.session.user) + "&&" + req.body.content })
    } else {
        const result = await ChatContent.update(
            {
                chat_content: Sequelize.fn(
                    "CONCAT",
                    Sequelize.col("chat_content.chat_content"),
                    "//" + String(req.session.user) + "&&" + req.body.content
                ),
            },
            {
                where: {
                    room_id: roomid.dataValues.room_id,
                },
            }
        );
        //console.log("add result",result);
    }

}

exports.takeChatContant = async (req, res) => {
    const result = await ChatRoom.findAll({
        where: { room_name: req.query.member_id },
    })
    //console.log(req.query.member_id);
    //console.log(result);
    const content = await ChatContent.findOne({
        where: { room_id: result[0].dataValues.room_id }
    })
    //console.log(content);
    res.send({ content: content, roomname: req.query.member_id ,mynum:req.session.user });
}

exports.takeChat = async (req, res) => {
    let isroomexist = false;
    let roomName = ""
    if (Number(req.query.member_id) > Number(req.session.user)) {
        roomName = "(" + String(req.session.user) + ")" + "+" + "(" + String(req.query.member_id) + ")";
    }
    else {
        roomName = "(" + String(req.query.member_id) + ")" + "+" + "(" + String(req.session.user) + ")";
    }
    console.log("roomname:", roomName);
    const result = await ChatRoom.findAll({
        where: { room_name: roomName },
    })
    console.log(result);
    if (result.length == 0) {
        const makeroom = await ChatRoom.create({
            room_name: roomName
        })
        ////console.log(makeroom)
    } else {
        isroomexist = true;
    }
    res.send(roomName);
}