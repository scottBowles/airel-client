import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

import watchAndRun from '@kitql/vite-plugin-watch-and-run';

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [
				watchAndRun([
					{
						watch: '**/*.(gql|graphql)',
						run: isProd ? 'npm run gen' : 'npm run gen:dev'
					}
				])
			]
		}
	}
};

export default config;
