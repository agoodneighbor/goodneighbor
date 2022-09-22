const { Member } = require("../model/Member");

exports.member = (req, res) => {
	res.render("index");
};

exports.get_visitors = (req, res) => {
	Member.findAll().then((result) => {
		console.log("result : ", result);
		console.log("index");
		res.render("index", { data: result });
	});
	// select name, comment from visitor where id= ???
};
