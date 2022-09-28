"use strict";

const { Model } = require("sequelize");
const { Product, WishList, OrderList, Member, Address } = require("../Model");

// const {  } = require("../Model");

exports.product = (req, res) => {
	// Product.findAll()
	console.log(1);
	res.render("Product");
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

	await Product.findAll().then((result) => {
		let dataValues = [];
		for (let i of result) {
			dataValues.push(i.dataValues);
			console.log(dataValues);
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

	if (req.session.user !== undefined) {
		is_login = true;
		let include = [{ model: Address, attributes: ["city", "dong"] }];

		await Member.findOne({
			include: include,
		}).then((result) => {
			myPoint = result.address.dataValues;
			serchCategory = result.address.dataValues;
			console.log(myPoint);
		});
		// attributes: { exclude: ["companyId"] }
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
	}).then((result) => {
		console.log(result);
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
};

// exports.detail = (req, res) => {
// 	res.render("detailProductPage");
// };

exports.showDetail = async (req, res) => {
	let product_id = req.params.id;
	await Product.findAll({
		where: { product_id: Number(product_id) },
	}).then((result) => {
		console.log(result[0].dataValues, 11);
		res.render("detailPage", { product_detail_info: result[0].dataValues });
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
			console.log(dataValues);
		}
		res.render("WishList", { data: dataValues });
	});
};

//내상품 페이지 조회

exports.jimm = async (req, res) => {
	let member_id = Number(req.session.user);
	await Product.findAll({
		where: { member_id: member_id },
	}).then((result) => {
		let dataValues = [];
		for (let i of result) {
			dataValues.push(i.dataValues);
			console.log(dataValues);
		}
		res.render("MyList", { data: dataValues });
	});
};
