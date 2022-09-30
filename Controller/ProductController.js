"use strict";

const { Model } = require("sequelize");
const {
	Product,
	WishList,
	OrderList,
	Member,
	Address,
	ImgUrl,
} = require("../Model");
const sequelize = require("sequelize");
const { raw } = require("express");
const Op = sequelize.Op;
// const {  } = require("../Model");

exports.product = (req, res) => {
	// Product.findAll()
	res.render("Product");
};

exports.ProductAdd = (req, res) => {
	// console.log(JSON.parse(req.body.userdata)["name"], 1111);
	let imgScr = "";
	for (let i of req.files) {
		imgScr += "imgParseStandard" + i["path"];
	}
	// console.log(imgScr);
	const data = {
		member_id: Number(req.session.user),
		product_name: JSON.parse(req.body.userdata)["name"],
		product_content: JSON.parse(req.body.userdata)["detail"],
		product_price: Number(JSON.parse(req.body.userdata)["price"]),
		product_category: JSON.parse(req.body.userdata)["category"],
		product_img_src: imgScr,
		product_user_id: "delete soon",
	};
	Product.create(data).then((result) => {
		// console.log(result);
		res.send(result);
	});
};

exports.serchProduct = async (req, res) => {
	let isOkay = true;

	await Product.findAll().then((result) => {
		let dataValues = [];
		for (let i of result) {
			dataValues.push(i.dataValues);
		}
	});

	// if (isOkay) {
	// 	const data = {
	// 		user_id: req.body.id,
	// 		user_pw: req.body.password,
	// 		user_name: req.body.name,
	// 	};
	// 	const address = {
	// 		city: req.body["시"],
	// 		dong: req.body["구"],
	// 		remaining_address: req.body["동"],
	// 	};
	// 	await Address.create(address).then((result) => {
	// 		data["address_id"] = result.dataValues["address_id"];
	// 		Member.create(data).then((result) => {});
	// 	});
	// }
	res.send(isOkay);
};

exports.products = async (req, res) => {
	let is_login = false;
	let serchCategory = {};
	let myPoint = undefined;
	let searchtag = "";
	if (req.params.search != undefined) {
		searchtag = req.params.search;
	}
	if (req.session.user !== undefined) {
		is_login = true;
		let include = [{ model: Address, attributes: ["city", "dong"] }];

		await Member.findOne({
			include: include,
		}).then((result) => {
			myPoint = result.address.dataValues;
			serchCategory = result.address.dataValues;
		});
	}

	// serchCategory = { city: "대구시", dong: "수성구" };
	await Product.findAll({
		include: [
			{
				model: Member,
				required: true,
				include: [
					{
						model: Address,
						where: serchCategory,
						required: true,
					},
				],
				// where: { product_id: Number(product_id) },
			},
		],
		where: { product_name: { [Op.like]: "%" + searchtag + "%" } },
	}).then((result) => {
		let dataValues = [];
		let datetime_arr = [];
		for (let i of result) {
			dataValues.push(i.dataValues);

			datetime_arr.push(
				`${String(i.dataValues["product_time"]).split(" ")[1]} ${
					String(i.dataValues["product_time"]).split(" ")[2]
				}`
			);
		}
		res.render("Product", {
			is_login: is_login,
			dataValues: dataValues,
			category: "감자",
			datetime_arr: datetime_arr,
		});
	});

	// serchCategory = { city: "대구시", dong: "수성구" };
	await Product.findAll({
		// raw: true,
		include: [
			{
				model: Member,
				required: true,
				include: [
					{
						model: Address,
						where: serchCategory,
						required: true,
					},
				],
				// where: { product_id: Number(product_id) },
			},
		],
	}).then((result) => {
		let dataValues = [];
		let datetime_arr = [];
		for (let i of result) {
			dataValues.push(i);

			datetime_arr.push(
				`${String(i["product_time"]).split(" ")[1]} ${
					String(i["product_time"]).split(" ")[2]
				}`
			);
		}
		res.render("Product", {
			is_login: is_login,
			dataValues: dataValues,
			category: "감자",
			datetime_arr: datetime_arr,
		});
	});
};

exports.showDetail = async (req, res) => {
	let product_id = req.params.id;
	await Product.findAll({
		//raw:true,
		include: [{ model: WishList }],
		// include: [{ model: ImgUrl }],
		where: { product_id: Number(product_id) },
	}).then((result) => {
		res.render("detailPage", {
			product_detail_info: result[0].dataValues,
			Like: result[0].dataValues.wish_lists.length,
			product_img_src: result[0].product_img_src.split("imgParseStandard"),
		});
	});
};

//찜하기
exports.DoJimm = async (req, res) => {
	let member_id = Number(req.session.user);
	await WishList.create({
		product_id: Number(req.body.product_id),
		member_id: Number(req.session.user),
	}).then((result) => {
		let dataValues = [];
		for (let i of result) {
			dataValues.push(i.dataValues);
		}
		res.send(true);
	});
};

//찜 페이지 조회

exports.Jimm = async (req, res) => {
	let member_id = Number(req.session.user);
	await WishList.findAll({
		where: { member_id: member_id },
	}).then((result) => {
		let dataValues = [];
		for (let i of result) {
			dataValues.push(i.dataValues);
		}
		res.send(dataValues);
	});
};

//내상품 페이지 조회

exports.Myproduct = async (req, res) => {
	let member_id = Number(req.session.user);
	await Product.findAll({
		where: { member_id: member_id },
	}).then((result) => {
		let dataValues = [];
		for (let i of result) {
			dataValues.push(i.dataValues);
		}
		res.send(dataValues);
	});
};

// 이미지 테이블에서 이미지들 불러오기 위한 연결
// exports.LoadingImgs = async (req, res) => {
// 	const image_id = req.session.user;
// 	await ImgUrl.findAll({
// 		where: { image_id: image_id },
// 	});
// };
