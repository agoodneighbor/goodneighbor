"use strict";

const { Member, Address } = require("../Model");

exports.member = (req, res) => {
	res.render("index");
};

exports.asign = async (req, res) => {
	let isOkay = true;

	await Member.findAll({
		attributes: ["user_id"],
	}).then((result) => {
		for (let i = 0; i < result.length; i++) {
			if (result[i].dataValues["user_id"] === req.body.id) {
				isOkay = false;
			}
		}
	});

	if (isOkay) {
		const data = {
			user_id: req.body.id,
			user_pw: req.body.password,
			user_name: req.body.name,
		};
		const address = {
			city: req.body["시"],
			dong: req.body["구"],
			remaining_address: req.body["동"],
		};
		await Address.create(address).then((result) => {
			data["address_id"] = result.dataValues["address_id"];
			Member.create(data).then((result) => {});
		});
	}
	res.send(isOkay);
};

exports.login = async (req, res) => {
	let isOkay = false;

	await Member.findAll({
		attributes: ["user_id", "user_pw"],
	}).then((result) => {
		for (let i = 0; i < result.length; i++) {
			if (
				result[i].dataValues["user_id"] === req.body.id &&
				result[i].dataValues["user_pw"] === req.body.pw
			) {
				isOkay = true;
			}
		}
	});
	res.send(isOkay);
};

// exports.delete_comment = (req,res) => {
//     Visitor.destroy({
//         where : { id: req.body.id }
//     }).then((result)=>{
//         console.log( result );
//         res.send( "삭제 성공" );
//     })
//     //delete from visitor where id = req.body.id
// }
