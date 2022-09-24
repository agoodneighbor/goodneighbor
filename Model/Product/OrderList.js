const OrderList = (Sequelize, DataTypes) => {
	const OrderList = Sequelize.define(
		"order_list",
		{
			product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
		},
		{
			// database 모델 정의 부분. mysql은 db 생성 시 적용함.
			tableName: "order_list",
			freezeTableName: true,
			timestamps: false,
		}
	);
	return OrderList;
};

module.exports = OrderList;
