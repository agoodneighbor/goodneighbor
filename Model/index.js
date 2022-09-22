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

db.Member = require("./Member")(sequelize, Sequelize);
db.Address = require("./Address")(sequelize, Sequelize);

db.Address.hasMany(db.Member, {
	foreignKey: "address_id",
	sourceKey: "address_id",
	onUpdate: "cascade",
});

db.Member.belongsTo(db.Address, {
	foreignKey: "address_id",
	sourceKey: "address_id",
	onUpdate: "cascade",
});

module.exports = db;
