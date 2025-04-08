module.exports = (sequelize, DataTypes) => {
	const DepartmentEmployee = sequelize.define(
		'DepartmentEmployee',
		{
			employee_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				references: {
					model: 'employee', // references Employee model
					key: 'id',
				},
			},
			department_id: {
				type: DataTypes.STRING(4),
				allowNull: false,
				references: {
					model: 'department', // references Department model
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
			tableName: 'department_employee',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		}
	);
	DepartmentEmployee.associate = (models) => {
		DepartmentEmployee.belongsTo(models.Employee, { foreignKey: 'employee_id' });
		DepartmentEmployee.belongsTo(models.Department, { foreignKey: 'department_id' });
	};
	return DepartmentEmployee;
};
