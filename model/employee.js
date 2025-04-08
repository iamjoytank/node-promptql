module.exports = (sequelize, DataTypes) => {
	const Employee = sequelize.define(
		'Employee',
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
			},
			birth_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			first_name: {
				type: DataTypes.STRING(14),
				allowNull: false,
			},
			last_name: {
				type: DataTypes.STRING(16),
				allowNull: false,
			},
			gender: {
				type: DataTypes.ENUM('M', 'F'), // Assuming the gender is 'M' or 'F'
				allowNull: false,
			},
			hire_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			tableName: 'employee',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		}
	);
	Employee.associate = (models) => {
		Employee.hasMany(models.DepartmentEmployee, { foreignKey: 'employee_id' });
		Employee.hasMany(models.Salary, { foreignKey: 'employee_id' });
		Employee.hasMany(models.Title, { foreignKey: 'employee_id' });

	};
	return Employee;
};
