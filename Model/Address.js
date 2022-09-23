const Address = (Sequelize, DataTypes) => {
	const model = Sequelize.define(
		"address",
		{
			address_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			city: {
				type: DataTypes.STRING(5),
				allowNull: false,
			},
			dong: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			remaining_address: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
		},
		{
			// database 모델 정의 부분. mysql은 db 생성 시 적용함.
			tableName: "address",
			freezeTableName: true,
			timestamps: false,
		}
	);
	return model;
};

module.exports = Address;
