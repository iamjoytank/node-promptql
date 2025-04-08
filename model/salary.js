module.exports = (sequelize, DataTypes) => {
	const Salary = sequelize.define(
		'Salary',
		{
			employee_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'employee',
					key: 'id',
				},
			},
			amount: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			from_date: {
				type: DataTypes.DATE,
				primaryKey: true,
				allowNull: false,
			},
			to_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			tableName: 'salary',
			hasPrimaryKey: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		}
	);
	Salary.associate = (models) => {
		Salary.belongsTo(models.Employee, { foreignKey: 'employee_id' });
	};
	return Salary;
};
