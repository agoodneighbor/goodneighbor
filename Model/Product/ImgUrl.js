const ImgUrl = (Sequelize, DataTypes) => {
	const ImgUrl = Sequelize.define(
		"img_url",
		{
			image_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			image_url: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
		},
		{
			tableName: "img_url",
			freezeTableName: true,
			timestamps: false,
		}
	);
	return ImgUrl;
};

module.exports = ImgUrl;
