<script context="module" lang="ts">
	import { kitQLClient } from '$lib/graphql/kitQLClient';

	export async function load({ session }) {
		console.log('__layout', { session });
		// if (!session.isLoggedIn) {
		// 	return {
		// 		status: 302,
		// 		redirect: '/login'
		// 	};
		// }
		kitQLClient.setHeaders({ Authorization: `JWT ${session.token}` });
		return {};
	}
</script>

<script>
	import '@kahi-ui/framework/dist/kahi-ui.framework.min.css';
	import '@kahi-ui/framework/dist/kahi-ui.theme.default.min.css';
	// https://github.com/sindresorhus/github-markdown-css
	// Run `npm run make` to update the CSS. (From github's repo, presumably?)
	import 'github-markdown-css/github-markdown.css';

	import { navigating } from '$app/stores';

	import NavBar from '$lib/components/NavBar.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<!-- TODO: put NavBar outside of main and handle min-height accordingly -->
<main>
	<NavBar />
	<slot />
</main>

<style>
	main {
		background-color: #f5f5f5;
		min-height: 100vh;
		width: 100vw;
		overflow: hidden;
	}
</style>
