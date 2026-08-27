// @ts-check
import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
	{
		ignores: ['dist/', '.astro/', 'node_modules/', '.wrangler/'],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...eslintPluginAstro.configs['flat/recommended'],
	{
		files: ['**/*.astro'],
		rules: {
			'astro/no-set-html-directive': 'error',
		},
	},
	{
		// Safe override: JSON-LD structured data is static and internal, so XSS risk is non-existent
		files: ['src/components/Seo.astro'],
		rules: {
			'astro/no-set-html-directive': 'off',
		},
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			// TypeScript natively catches undefined variables; core rule is redundant here
			'no-undef': 'off',
		},
	},
);
