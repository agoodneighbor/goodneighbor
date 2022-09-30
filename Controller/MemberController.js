"use strict";

const { Member, Address } = require("../Model");

exports.member = (req, res) => {
	// 로그인 성공시 인덱스 파일 렌더
	let is_login = false;
	if (req.session.user !== undefined) is_login = true;
	res.render(
		"index"
		// { is_login: is_login }
	);
};

// 회원가입
exports.asign = async (req, res) => {
	let isOkay = true;
	let result = await Member.findAll({
		attributes: ["user_id"],
	})
	for (let i = 0; i < result.length; i++) {
		if (result[i].dataValues["user_id"] === req.body.id) {
			isOkay = false;
		}
	;

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

		let secondResult = await Address.create(address)
		data["address_id"] = secondResult.dataValues["address_id"];
		Member.create(data).then(() => {});
	}
	res.send(isOkay);
};

// 로그인
exports.login = async (req, res) => {
	let isOkay = false;
	let result =await Member.findAll({
		attributes: ["user_id", "user_pw", "member_id"],
	})

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
	if (isOkay) req.session.user = currnet_member_id;
	res.send(isOkay);
};

// 로그아웃
exports.Logout = async (req, res) => {
	if (req.session.user) {
		//세션정보가 존재하는 경우
		await req.session.destroy(function (err) {
			if (err) console.log(err);
			else res.send(true);
		});
	}
};

//회원정보 수정
exports.accessProfile = async (req, res) => {
	let is_login = false;
	let member_id = Number(req.session.user);

	if (req.session.user !== undefined) {
		is_login = true;
	}
	let result = await Member.findOne({
		where: { member_id: member_id },
	})
	res.render("Profile",{ is_login: is_login, user: result.dataValues });
};

// exports.FixedProfile = async (req) => {}; <- 어떤 파일인지 정확하지 않아서 주석처리
