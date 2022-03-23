import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

import gQueryCodegen from '@leveluptuts/g-query/codegen';

const isProd = process.env.NODE_ENV === 'production';
const PROD_SCHEMA_PATH = 'https://airel.onrender.com/graphql/schema';
const DEV_SCHEMA_PATH = 'http://127.0.0.1:8000/graphql/schema/';
const SCHEMA_PATH = isProd ? PROD_SCHEMA_PATH : DEV_SCHEMA_PATH;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [
				gQueryCodegen({
					schema: SCHEMA_PATH, // path to schema, schema is required
					out: './src/lib/graphql', // Where you want the general schema types to output
					gPath: '$lib/config/g', // Path to g, created in step 1.
					// Optional
					debug: true // boolean, this adds logging for gq files deleted and on codegen
				})
			]
		}
	}
};

export default config;
