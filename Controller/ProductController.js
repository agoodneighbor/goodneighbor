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

// exports.wishlist = (req, res) => {
// 	console.log(1);
// 	res.send("wish_list here");
// };

// exports.orderlist = (req, res) => {
// 	console.log(1);
// 	res.send("order_list here");
// };
