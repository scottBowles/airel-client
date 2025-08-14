import houdini from 'houdini/vite';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [houdini(), tailwindcss(), sveltekit()],
	build: {
		rollupOptions: {
			// Needed to make dompurify work in SSR. See: https://github.com/kkomelin/isomorphic-dompurify/issues/163.
			external: ['isomorphic-dompurify']
		}
	}
});
