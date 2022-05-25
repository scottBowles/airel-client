<script lang="ts">
	import { Viewer } from 'bytemd';
	import 'bytemd/dist/index.css';
	// https://github.com/sindresorhus/github-markdown-css
	// Run `npm run make` to update the CSS. (From github's repo, presumably?)
	import 'github-markdown-css/github-markdown.css';

	// import gfm from '@bytemd/plugin-gfm';

	// const plugins = [gfm()];
	const plugins = [];
	export let value = '';
</script>

<Viewer {value} />

<style>
	:global(.bytemd) {
		height: 500px;
		width: auto;
	}

	/**
	 * The .markdown-body class is on the outer div in the Viewer component and
	 * is subsequently used by the github-markdown-css library to style the
	 * rendered markdown.
	 */
	:global(.markdown-body) {
		background: inherit;
	}
</style>
