const Sequelize = require("sequelize");
const config = require("../config/config.json")["development"];
const db = {};

const sequelize = new Sequelize(
	config.database, // 데이터베이스
	config.username, // 사용자명
	config.password, // 비밀번호
	config // 정보 전체
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Member = require("./SignUp/Member")(sequelize, Sequelize);
db.Address = require("./SignUp/Address")(sequelize, Sequelize);
db.Product = require("./Product/Product")(sequelize, Sequelize);
db.OrderList = require("./Product/OrderList")(sequelize, Sequelize);
db.WishList = require("./Product/WishList")(sequelize, Sequelize);

// #1-1, 주소테이블에 회원 가입 foreign key 연결
db.Address.hasOne(db.Member, {
	foreignKey: "address_id",
	sourceKey: "address_id",
	onUpdate: "cascade",
});

// #1-2, 회원 가입에 주소테이블 foreign key 연결
db.Member.belongsTo(db.Address, {
	foreignKey: "address_id",
	sourceKey: "address_id",
	onUpdate: "cascade",
});

// #2-1, 회원 가입에 상품 foreign key 연결
db.Member.hasMany(db.Product, {
	foreignKey: "member_id",
	sourceKey: "member_id",
	onUpdate: "cascade",
});

// #2-2, 상품에 회원 가입 foreign key 연결
db.Product.belongsTo(db.Member, {
	foreignKey: "member_id",
	sourceKey: "member_id",
	onUpdate: "cascade",
});

// #3-1, 회원 가입에 구매 목록 foreign key 연결
db.Member.hasMany(db.OrderList, {
	foreignKey: "member_id",
	sourceKey: "member_id",
	onUpdate: "cascade",
});

// #3-2, 구매 목록에 회원 가입 foreign key 연결
db.OrderList.belongsTo(db.Member, {
	foreignKey: "member_id",
	sourceKey: "member_id",
	onUpdate: "cascade",
});

// #3-3, 구매 목록에 상품 foreign key 연결
db.Product.hasMany(db.OrderList, {
	foreignKey: "member_id",
	sourceKey: "member_id",
	onUpdate: "cascade",
});

// #3-4, 구매 목록에 상품 foreign key 연결
db.OrderList.belongsTo(db.Product, {
	foreignKey: "product_id",
	sourceKey: "product_id",
	onUpdate: "cascade",
});

// #4-1, 회원 가입에 찜 목록 foreign key 연결
db.Member.hasMany(db.WishList, {
	foreignKey: "member_id",
	sourceKey: "member_id",
	onUpdate: "cascade",
});

// #4-2, 찜 목록에 회원 가입 foreign key 연결
db.WishList.belongsTo(db.Member, {
	foreignKey: "member_id",
	sourceKey: "member_id",
	onUpdate: "cascade",
});

// #4-3, 상품에 찜 목록 foreign key 연결
db.Product.hasMany(db.WishList, {
	foreignKey: "product_id",
	sourceKey: "product_id",
	onUpdate: "cascade",
});

// #4-4, 찜 목록에 상품 foreign key 연결
db.WishList.belongsTo(db.Product, {
	foreignKey: "product_id",
	sourceKey: "product_id",
	onUpdate: "cascade",
});

// db.ImgUrl = require("./ImgUrl")(sequelize, Sequelize);

// // #5-1, product_id에 이미지 URL 테이블 FK 연결
// db.Product.hasMany(db.ImgUrl, {
// 	foreignKey: "product_id",
// 	sourceKey: "product_id",
// 	onUpdate: "cascade",
// });
// // #5-2, 이미지 URL 테이블에 product_id FK 연결
// db.ImgUrl.belongsTo(db.Product, {
// 	foreignKey: "product_id",
// 	sourceKey: "product_id",
// 	onUpdate: "cascade",
// });

module.exports = db;
