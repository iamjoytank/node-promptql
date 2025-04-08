module.exports = (sequelize, DataTypes) => {
	const Title = sequelize.define(
		'Title',
		{
			id: {
				type: DataTypes.STRING(4),
				primaryKey: true,
				allowNull: true,
			},
			employee_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				references: {
					model: 'employee',
					key: 'id',
				},
			},
			title: {
				type: DataTypes.STRING(50),
				allowNull: false,
				primaryKey: true,
			},
			from_date: {
				type: DataTypes.DATE,
				allowNull: false,
				primaryKey: true,
			},
			to_date: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			tableName: 'title',
			hasPrimaryKey: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		}
	);
	Title.associate = (models) => {
		Title.belongsTo(models.Employee, { foreignKey: 'employee_id' });
	};
	return Title;
};
