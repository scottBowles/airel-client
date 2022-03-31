<script context="module" lang="ts">
	export async function load({ session, url }) {
		if (!session.isLoggedIn && url.pathname !== '/login') {
			return {
				status: 302,
				redirect: '/login'
			};
		}
		return {};
	}
</script>

<script>
	import '@kahi-ui/framework/dist/kahi-ui.framework.min.css';
	import '@kahi-ui/framework/dist/kahi-ui.theme.default.min.css';

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
