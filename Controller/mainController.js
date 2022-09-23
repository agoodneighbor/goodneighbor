// const { User } = require("../chatModel");

exports.main = (req, res) => {
	res.render("index");
};
<<<<<<< HEAD
exports.upload = (req,res) => {
	res.render('upload');
};

exports.product = (req,res) => {
	res.render('product');
=======

const { Member } = require("../model/Member");

exports.get_visitors = (req, res) => {
	Member.findAll().then((result) => {
		console.log("result : ", result);
		console.log("index");
		res.render("index", { data: result });
	});
>>>>>>> upstream/header
};
