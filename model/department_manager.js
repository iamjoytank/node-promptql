module.exports = (sequelize, DataTypes) => {
	const DepartmentManager = sequelize.define(
		'DepartmentManager',
		{
			employee_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				references: {
					model: 'employee',
					key: 'id',
				},
			},
			department_id: {
				type: DataTypes.STRING(4),
				allowNull: false,
				references: {
					model: 'department',
					key: 'id',
				},
			},
			from_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			to_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			tableName: 'department_manager',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		}
	);
	DepartmentManager.associate = (models) => {
		DepartmentManager.belongsTo(models.Department, { foreignKey: 'department_id' });
		DepartmentManager.belongsTo(models.Employee, { foreignKey: 'employee_id' });
	};
	return DepartmentManager;
};
