"use strict";

const { Product, WishList, OrderList } = require("../Model");
// const {  } = require("../Model");

exports.product = (req, res) => {
	// Product.findAll()
	console.log(1);
	res.send("haha");
};

exports.ProductAdd = (req, res) => {
	console.log(JSON.parse(req.body.userdata)["name"], 1111);
	const data = {
		member_id: Number(req.session.user),
		product_name: JSON.parse(req.body.userdata)["name"],
		product_content: JSON.parse(req.body.userdata)["detail"],
		product_price: Number(JSON.parse(req.body.userdata)["price"]),
		product_category: JSON.parse(req.body.userdata)["category"],
		product_img_src: req.files[0]["path"],
		product_user_id: "delete soon",
	};
	Product.create(data).then((result) => {
		console.log(result);
		res.send(result);
	});
};

exports.serchProduct = async (req, res) => {
	let isOkay = true;

	await Product.findAll({
		attributes: ["user_id"],
	}).then((result) => {
		for (let i = 0; i < result.length; i++) {
			if (result[i].dataValues["user_id"] === req.body.id) {
				isOkay = false;
			}
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
