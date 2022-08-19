import watchAndRun from '@kitql/vite-plugin-watch-and-run';
import { sveltekit } from '@sveltejs/kit/vite';

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		watchAndRun([
			{
				watch: '**/*.(gql|graphql)',
				run: isProd ? 'npm run gen' : 'npm run gen:dev'
			}
		]),
		sveltekit()
	]
};

export default config;
