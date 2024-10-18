/** @type {import('eslint').Linter.FlatConfig} */
const config = [
	{
		languageOptions: {
			globals: {
				// Define global variables here
				document: 'readonly',
				window: 'readonly',
				process: 'readonly',
			},
			parserOptions: {
				ecmaVersion: 2021,
				sourceType: 'module',
			},
		},
		files: ['**/*.js'], // Specify the files to which this config applies
		rules: {
			'no-console': 'warn',
		},
	},
];

module.exports = config;
