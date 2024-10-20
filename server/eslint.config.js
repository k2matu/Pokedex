/** @type {import('eslint').Linter.FlatConfig} */
const config = [
	{
		languageOptions: {
			globals: {
				document: 'readonly',
				window: 'readonly',
				process: 'readonly',
			},
			parserOptions: {
				ecmaVersion: 2021,
				sourceType: 'module',
			},
		},
		files: ['**/*.js'],
		rules: {
			'no-console': 'warn',
		},
	},
];

module.exports = config;
