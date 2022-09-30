"use strict";

const { request } = require("express");
const { Member, Address } = require("../Model");

exports.member = (req, res) => {
	let is_login = false;

	if (req.session.user !== undefined) {
		is_login = true;
	}
	// console.log(is_login);
	res.render("index", { is_login: is_login });
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
		attributes: ["user_id", "user_pw", "member_id"],
	}).then((result) => {
		let currnet_member_id = undefined;

		for (let i = 0; i < result.length; i++) {
			if (
				result[i].dataValues["user_id"] === req.body.id &&
				result[i].dataValues["user_pw"] === req.body.pw
			) {
				isOkay = true;
				currnet_member_id = result[i].dataValues["member_id"];
			}
		}
		if (isOkay) {
			req.session.user = currnet_member_id;

			// console.log(req.session.user);
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

//로그아웃

exports.Logout = async (req, res) => {
	if (req.session.user) {
		//세션정보가 존재하는 경우
		await req.session.destroy(
			// err ? console.log(err) : res.send(true)
			function (err) {
				if (err) {
					console.log(err);
				} else {
					res.send(true);
				}
			}
		);
	}
};

//회원정보 수정

exports.accessProfile = async (req, res) => {
	let is_login = false;

	if (req.session.user !== undefined) {
		is_login = true;
	}
	let member_id = Number(req.session.user);

	await Member.findOne({
		where: { member_id: member_id },
	}).then((result) => {
		// console.log(result);
		res.render("Profile", { is_login: is_login, user: result.dataValues });
	});
};

exports.FixedProfile = async (req, res) => {
	let member_id = Number(req.session.user);
};
