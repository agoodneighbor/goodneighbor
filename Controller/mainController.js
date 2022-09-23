// const { User } = require("../chatModel");

exports.main = (req, res) => {
	res.render("index");
};

const { Member } = require("../model/Member");

exports.get_visitors = (req, res) => {
	Member.findAll().then((result) => {
		console.log("result : ", result);
		console.log("index");
		res.render("index", { data: result });
	});
};
