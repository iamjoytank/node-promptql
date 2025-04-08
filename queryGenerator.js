const OpenAI = require('openai');
const db = require('./model');
const openai = new OpenAI({
	baseURL: 'https://openrouter.ai/api/v1',
	apiKey: process.env.OPENAI_API_KEY,
});
function extractModelSchemas(models) {
	return Object.keys(models)
		.map((modelName) => {
			const model = models[modelName];
			if (!model.rawAttributes) return ''; // Skip if it's not a Sequelize model
			const attributes = Object.keys(model.rawAttributes).map((key) => {
				const attr = model.rawAttributes[key];
				return `${key} (${attr.type.key}${attr.allowNull ? ', NULL' : ', NOT NULL'})`;
			});
			return `Table: "${model.tableName}"\nColumns:\n- ${attributes.join('\n- ')}`;
		})
		.filter((schema) => schema)
		.join('\n\n');
}
exports.generateSQL = async (query, context) => {
	const schemaContext = extractModelSchemas(db.models);

	const systemPrompt = `
You are a highly accurate SQL query generator for PostgreSQL using Sequelize.
**Your Goal:** Generate correct, optimized SQL queries based on the user's input using the schema provided.

**Important Guidelines:**  
- Only use the table names and column names from the schema below.  
- Do not create or assume any additional table or column names.  
- Follow PostgreSQL SQL syntax precisely.  
- Ensure queries are safe, efficient, and optimized.  
- Do not generate explanations or comments; return only the SQL query.  
- If a query is ambiguous, ask for clarification instead of guessing.  

**Database Schema:**  
${schemaContext}

**Previous Context (if applicable):**  
${JSON.stringify(context)}

**Additional Instructions:**  
- Use correct column names in the 'SELECT' clause.  
- If the user asks for data across tables, infer logical joins using matching keys.  
- Generate queries using best practices (e.g., indexed columns for filtering).  
- For date-related queries, ensure correct date formats using PostgreSQL functions.  

**User Request:**  
"${query}"

**Output Requirements:**  
- Provide only the clean SQL query without additional explanations.  
- Ensure correct use of double quotes for column and table names when necessary.  
- Do not return any additional formatting like code blocks or markdown.
`;

	console.log('prompt', JSON.stringify(systemPrompt));
	const response = await openai.chat.completions.create({
		model: 'google/gemini-2.0-flash-001',
		messages: [
			{ role: 'system', content: systemPrompt },
			{ role: 'user', content: query },
		],
		max_tokens: 1000,
		temperature: 0.7,
	});
	return response.choices[0].message.content;
};
