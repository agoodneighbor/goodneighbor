"use strict";

const { Product, WishList, OrderList } = require("../Model");
// const {  } = require("../Model");

exports.product = (req, res) => {
	// Product.findAll()
	console.log(1);
	res.send("haha");
};


exports.ProductAdd=(req,res)=>{
	console.log(req.files);
	console.log(JSON.parse(req.body["userdata"]))

}

// exports.wishlist = (req, res) => {
// 	console.log(1);
// 	res.send("wish_list here");
// };

// exports.orderlist = (req, res) => {
// 	console.log(1);
// 	res.send("order_list here");
// };
