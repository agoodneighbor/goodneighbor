const Member = (Sequelize, DataTypes) => {
	const model = Sequelize.define(
		"member",
		{
			member_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			user_pw: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			user_name: {
				type: DataTypes.STRING(10),
				allowNull: false,
			},
		},
		{
			// database 모델 정의 부분. mysql은 db 생성 시 적용함.
			tableName: "member",
			freezeTableName: true,
			timestamps: false,
		}
	);
	return model;
};

module.exports = Member;
