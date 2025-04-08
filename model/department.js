module.exports = (sequelize, DataTypes) => {
	const Department = sequelize.define(
		'Department',
		{
			id: {
				type: DataTypes.STRING(4),
				primaryKey: true,
				allowNull: false,
			},
			dept_name: {
				type: DataTypes.STRING(40),
				allowNull: false,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.fn('now'),
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.fn('now'),
			},
		},
		{
			tableName: 'department',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		}
	);
	Department.associate = (models) => {
		Department.hasMany(models.DepartmentEmployee, { foreignKey: 'department_id' });
		Department.hasMany(models.DepartmentManager, { foreignKey: 'department_id' });
	};
	return Department;
};
