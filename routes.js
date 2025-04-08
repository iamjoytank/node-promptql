const express = require('express');
const { sequelize } = require('./model');
const { generateSQL } = require('./queryGenerator');
const { getContext, saveContext } = require('./contextManager');

const router = express.Router();

router.post('/query', async (req, res) => {
	const { sessionId, query } = req.body;
	try {
		function cleanSQLQuery(query) {
			return query
				.replace(/```sql|```/g, '') // Remove SQL markdown
				.replace(/\s+/g, ' ') // Replace multiple spaces with a single space
				.trim(); // Remove leading and trailing spaces
		}

		const context = null;
		const sql = await generateSQL(query, context);
		console.log('sql from gemini', sql);
		let rawQuery = cleanSQLQuery(sql);
		console.log('Clean SQL Query:', rawQuery);
		const result = await sequelize.query(rawQuery);
		context && await saveContext(sessionId, { lastQuery: query });
		res.json({ result });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
