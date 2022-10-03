"use strict";

const { Model, where } = require("sequelize");
const {
	Product,
	WishList,
	OrderList,
	Member,
	Address,
	ImgUrl,
} = require("../Model");
const sequelize = require("sequelize");
const session = require("express-session");
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

		const result = await Member.findOne({
			include: include,
			where: { member_id: Number(req.session.user) },
		});
		//myPoint = result.address.dataValues;
		serchCategory = result.address.dataValues;
	}
	console.log("serchcate", serchCategory);
	console.log("mypoint", myPoint);

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
	//console.log(result)
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
	// console.log(JSON.parse(req.body.userdata)["name"], 1111);
	let imgScr = "";
	for (let i of req.files) {
		// console.log(i);
		imgScr += "imgParseStandard" + i["path"];
	}
	// console.log("imgScr", imgScr);

	const data = {
		member_id: Number(req.session.user),
		product_name: JSON.parse(req.body.userdata)["name"],
		product_content: JSON.parse(req.body.userdata)["detail"],
		product_price: Number(JSON.parse(req.body.userdata)["price"]),
		product_category: JSON.parse(req.body.userdata)["category"],
		product_img_src: imgScr,
		product_user_id: "delete soon",
	};
	const result = Product.create(data);
	// console.log(result);
	res.send(result);
};

exports.serchProduct = async (req, res) => {
	let isOkay = true;

	const result = await Product.findAll();
	let dataValues = [];
	for (let i of result) {
		dataValues.push(i.dataValues);
	}
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
	const anotherResult = await Product.findAll();
	console.log("anotherResult : ", anotherResult[0]);
	let detailImgArr = [];
	for (let i = 0; i < anotherResult.length; i++) {
		detailImgArr.push(
			anotherResult[i].dataValues.product_img_src.split("imgParseStandard")[1]
		);
	}
	// res.render();
	res.render("detailPage", {
		product_detail_info: result[0].dataValues,
		Like: result[0].dataValues.wish_lists.length,
		product_img_src: result[0].product_img_src.split("imgParseStandard"),
		detailImgArr: detailImgArr,
	});
};

//찜하기
exports.DoJimm = async (req, res) => {
	let member_id = Number(req.session.user);
	console.log(member_id);
	let isittrue = false;
	if (req.session.user == undefined) {
		isittrue = false;
	} else {
		const result = await WishList.create({
			product_id: Number(req.body.product_id),
			member_id: Number(req.session.user),
		});
		isittrue = true;
	}

	res.send(isittrue);
};
//새로 만들어진 함수 일단 주의!! (res send로는 숫자를 보낼수 없습니다!! 알아두셔야되요!! 꼭!!) 문자열로 바꾼후 넘기셔야됩니다 그래서 안된거에요
exports.checkJimm = async (req, res) => {
	console.log("checkJim,");
	let product_id = Number(req.body.product_id);
	//console.log(req)
	const result = await WishList.findAll({
		where: { product_id: product_id },
	});
	//console.log(result);
	res.send(String(result.length));
};

//찜 페이지 조회
exports.Jimm = async (req, res) => {
	let member_id = Number(req.session.user);
	await WishList.findAll({
		raw: true,
		include: [
			{
				model: Product,
			},
		],
		where: { member_id: member_id },
	}).then((result) => {
		console.log("whislist", result);
		let dataValues = [];
		let imgarray = [];
		for (let i of result) {
			dataValues.push(i);
			imgarray.push(i["Product.product_img_src"].split("imgParseStandard")[1]);
		}
		res.send({ dataValues: dataValues, img: imgarray });
	});

	let dataValues = [];
	for (let i of result) {
		dataValues.push(i.dataValues);
	}
	res.send(dataValues);
};

//내상품 페이지 조회
exports.Myproduct = async (req, res) => {
	let member_id = Number(req.session.user);
	const result = await Product.findAll({
		where: { member_id: member_id },
	});

	// console.log(result);
	let dataValues = [];
	for (let i of result) {
		dataValues.push(i.dataValues);
	}
	res.send(dataValues);
};

// 요 찝라이크의 문제점1 params로 넘겨준 데이터가 없어용!
// 2. 데이터 생성할때 우리는 제품아이디랑 유저아이디가 인트인데 여기서는 문자열 (일수도)있어요
// exports.jjimlike = async (req, res) => {
// 	console.log(req.body.jjimBool);
// 	if (req.body.jjimBool) {
// 		const data = {
// 			user_id: req.session.user,
// 			product_id: req.params.product_id,
// 		};
// 		WishList.create({ data }).then((result) => {
// 			res.send(true);
// 		});
// 	}
// 삭제
// };
// exports.jjimchecked = async (req, res) => {
// 	console.log("a");
// const result = await WishList.findOne({
// 	where: {
// 		user_id: req.session.user,
// 		product_id: req.params.product_id,
// 	},
// });
// if (result) res.send(true);
// else res.send(false);
// };
