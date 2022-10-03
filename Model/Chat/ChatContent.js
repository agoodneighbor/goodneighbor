const ChatContent = (Sequelize, DataTypes) => {
	const ChatContent = Sequelize.define(
		"chat_content",
		{
			content_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			chat_content: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			tableName: "chat_content",
			freezeTableName: true,
			timestamps: false,
		}
	);
	return ChatContent ;
};

module.exports = ChatContent ;