const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const chalk = require('chalk');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};
const models = {};

let sequelize = new Sequelize(process.env.DATABASE_URL, config);
(async () => {
	sequelize
		.authenticate()
		.then(() => {
			console.log(
				'%s Database connection has been established successfully.',
				chalk.green('✓')
			);
		})
		.catch((err) => {
			console.error('%s Unable to connect to the database:', chalk.red('X'), err);
		});

	fs.readdirSync(__dirname)
		.filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
		.forEach((file) => {
			const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
			db[model.name] = model;
			models[model.name] = model;
		});

	Object.keys(db).forEach((modelName) => {
		if (db[modelName].associate) {
			db[modelName].associate(db);
		}
	});
})();
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.models = models;

module.exports = db;
