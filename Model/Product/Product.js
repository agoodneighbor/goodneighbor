const Product = (Sequelize, DataTypes) => {
	const Product = Sequelize.define(
		"Product",
		{
			product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			product_name: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			product_category: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			product_price: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			product_img_src: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			product_content: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			product_time: {
				type: "TIMESTAMP",
				defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
				allowNull: false,
			},
			product_user_id: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
		},
		{
			tableName: "product",
			freezeTableName: true,
			timestamps: false,
		}
	);
	return Product;
};

module.exports = Product;
