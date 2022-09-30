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
const Op = sequelize.Op;

exports.products = async (req, res) => {
	let is_login = false;
	let serchCategory = {};
	let myPoint = undefined;
	let searchtag = "";

	if (req.params.search != undefined) searchtag = req.params.search;
	if (req.session.user !== undefined) {
		is_login = true;
		let include = [{ model: Address, attributes: ["city", "dong"] }];

		const result = await Member.findOne({ include: include });
		myPoint = result.address.dataValues;
		serchCategory = result.address.dataValues;
	}

	const result = await Product.findAll({
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
			},
		],
		where: { product_name: { [Op.like]: "%" + searchtag + "%" } },
	});

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
};

exports.ProductAdd = (req, res) => {
	console.log(JSON.parse(req.body.userdata)["name"], 1111);
	let imgScr = "";
	for (let i of req.files) {
		console.log(i);
		imgScr += "imgParseStandard" + i["path"];
	}
	console.log("imgScr", imgScr);

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
	res.send(isOkay);
};

exports.showDetail = async (req, res) => {
	let product_id = req.params.id;
	const result = await Product.findAll({
		//raw:true,
		include: [{ model: WishList }],
		where: { product_id: Number(product_id) },
	});
	// console.log("img", result[0].product_img_src.split("imgParseStandard"));
	// console.log("result", result);
	res.render("detailPage", {
		product_detail_info: result[0].dataValues,
		Like: result[0].dataValues.wish_lists.length,
		product_img_src: result[0].product_img_src.split("imgParseStandard"),
	});
	// .then((result) => {
	// 	console.log("img", result[0].product_img_src.split("imgParseStandard"));
	// 	console.log("result", result);

	// 	res.render("detailPage", {
	// 		product_detail_info: result[0].dataValues,
	// 		Like: result[0].dataValues.wish_lists.length,
	// 		product_img_src: result[0].product_img_src.split("imgParseStandard"),
	// 	});
	// });
};

//찜하기
exports.DoJimm = async (req, res) => {
	let member_id = Number(req.session.user);
	const result = await WishList.create({
		product_id: Number(req.body.product_id),
		member_id: Number(req.session.user),
	});
	let dataValues = [];
	for (let i of result) {
		dataValues.push(i.dataValues);
	}
	res.send(true);
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
