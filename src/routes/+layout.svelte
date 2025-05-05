<script lang="ts">
	import { navigating } from '$app/state';
	import { onMount, setContext, type Snippet } from 'svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { themeChange } from 'theme-change';

	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import { initShowAlgoliaSearchStore } from '$lib/stores';
	import '../app.css';
	import { browser } from '$app/environment';
	import { ThemeState } from '$lib/stores';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	// Initialize stores
	const userPrefersLight = browser && window.matchMedia('(prefers-color-scheme: light)').matches;
	const theme = new ThemeState(userPrefersLight ? 'light' : 'dark');
	const showAlgoliaSearch = initShowAlgoliaSearchStore();

	// Add stores to context
	setContext('theme', theme);
	setContext('showAlgoliaSearch', showAlgoliaSearch);

	onMount(() => {
		themeChange(false);
	});
</script>

{#if navigating.to}
	<PreloadingIndicator />
{/if}

<!-- TODO: put NavBar outside of main and handle min-height accordingly -->
<main>
	<SvelteToast options={{ pausable: true }} />
	{@render children?.()}
</main>

<style>
	main {
		min-height: 100vh;
		width: 100vw;
		overflow: hidden;
		position: relative;
	}
</style>
