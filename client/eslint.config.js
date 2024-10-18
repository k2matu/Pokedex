import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: 'detect' } }, // Automatically detects React version
    plugins: {
      react,          // Import the plugin object
      'react-hooks': reactHooks, // Import the plugin object
      'react-refresh': reactRefresh, // Import the plugin object
    },
    rules: {
      'semi': ['error', 'always'], // Enforce semicolons
      // Add any additional rules you want here
    },
  },
];
