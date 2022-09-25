const WishList = (Sequelize, DataTypes) => {
	const WishList = Sequelize.define(
		"wish_list",
		{
			wish_list_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
		},
		{
			// database 모델 정의 부분. mysql은 db 생성 시 적용함.
			tableName: "wish_list",
			freezeTableName: true,
			timestamps: false,
		}
	);
	return WishList;
};

module.exports = WishList;
