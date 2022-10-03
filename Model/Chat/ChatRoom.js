const ChatRoom = (Sequelize, DataTypes) => {
	const ChatRoom = Sequelize.define(
		"chat_room",
		{
			room_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			room_name: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
		},
		{
			tableName: "chat_room",
			freezeTableName: true,
			timestamps: false,
		}
	);
	return ChatRoom ;
};

module.exports = ChatRoom ;