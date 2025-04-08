'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Get all tables from the 'employee' schema
		const [tables] = await queryInterface.sequelize.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'employee'
        AND table_type = 'BASE TABLE';
    `);

		for (const table of tables) {
			const tableName = table.table_name;
			const from = `"employee"."${tableName}"`;
			const toSchema = 'public';

			// Move table to public schema
			await queryInterface.sequelize.query(`
        ALTER TABLE ${from} SET SCHEMA ${toSchema};
      `);
		}
	},

	down: async (queryInterface, Sequelize) => {
		// Rollback: move all tables back to 'employee' schema
		const [tables] = await queryInterface.sequelize.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name IN (
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema = 'employee'
        );
    `);

		for (const table of tables) {
			const tableName = table.table_name;
			const from = `"public"."${tableName}"`;
			const toSchema = 'employee';

			// Move table back to employee schema
			await queryInterface.sequelize.query(`
        ALTER TABLE ${from} SET SCHEMA ${toSchema};
      `);
		}
	},
};
