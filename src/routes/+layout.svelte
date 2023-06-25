<script>
	import { navigating } from '$app/stores';
	import { onMount, setContext } from 'svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { themeChange } from 'theme-change';

	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import { initShowAlgoliaSearchStore, initThemeStore } from '$lib/stores';
	import '../app.css';
	import { browser } from '$app/environment';

	// Initialize stores
	const userPrefersLight = browser && window.matchMedia('(prefers-color-scheme: light)').matches;
	const theme = initThemeStore(userPrefersLight ? 'light' : 'dark');
	const showAlgoliaSearch = initShowAlgoliaSearchStore();

	// Add stores to context
	setContext('theme', theme);
	setContext('showAlgoliaSearch', showAlgoliaSearch);

	onMount(() => {
		themeChange(false);
	});
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<!-- TODO: put NavBar outside of main and handle min-height accordingly -->
<main>
	<SvelteToast options={{ pausable: true }} />
	<slot />
</main>

<style>
	main {
		min-height: 100vh;
		width: 100vw;
		overflow: hidden;
		position: relative;
	}
</style>
