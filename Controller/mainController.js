// const { User } = require("../chatModel");
const { Member } = require("../model/Member");

exports.main = (req, res) => {
	res.render("index");
};

exports.upload = (req,res) => {
	res.render('upload');
};

exports.product = (req,res) => {
	res.render('product');
}



exports.get_visitors = (req, res) => {
	Member.findAll().then((result) => {
		console.log("result : ", result);
		console.log("index");
		res.render("index", { data: result });
	});
}
