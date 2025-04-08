'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const [tables] = await queryInterface.sequelize.query(`
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
        AND table_type = 'BASE TABLE';
    `);

		for (const table of tables) {
			const fullTableName = `"${table.table_schema}"."${table.table_name}"`;

			// Add created_at
			await queryInterface.sequelize.query(`
        ALTER TABLE ${fullTableName}
        ADD COLUMN IF NOT EXISTS createdAt TIMESTAMP DEFAULT now();
      `);

			// Add updated_at
			await queryInterface.sequelize.query(`
        ALTER TABLE ${fullTableName}
        ADD COLUMN IF NOT EXISTS updatedAt TIMESTAMP DEFAULT now();
      `);
		}
	},

	down: async (queryInterface, Sequelize) => {
		const [tables] = await queryInterface.sequelize.query(`
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
        AND table_type = 'BASE TABLE';
    `);

		for (const table of tables) {
			const fullTableName = `"${table.table_schema}"."${table.table_name}"`;

			await queryInterface.sequelize.query(`
        ALTER TABLE ${fullTableName}
        DROP COLUMN IF EXISTS created_at;
      `);

			await queryInterface.sequelize.query(`
        ALTER TABLE ${fullTableName}
        DROP COLUMN IF EXISTS updated_at;
      `);
		}
	},
};
