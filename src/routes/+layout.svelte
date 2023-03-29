<script>
	import { navigating } from '$app/stores';
	import Algolia from '$lib/components/Algolia.svelte';
	import CustomLayout from '$lib/components/nav/CustomLayout.svelte';
	import NavBar from '$lib/components/nav/NavBar.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import { initShowAlgoliaSearchStore, initThemeStore } from '$lib/stores';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import '../app.css';
	import { setContext } from 'svelte';

	// Initialize stores
	const theme = initThemeStore();
	const showAlgoliaSearch = initShowAlgoliaSearchStore();

	// Add stores to context
	setContext('theme', theme);
	setContext('showAlgoliaSearch', showAlgoliaSearch);
</script>

<svelte:head>
	<!-- this is currently included here and in the login component. may need to remove async and defer to get it to work? -->
	<!-- this is currently included here and in the login component. may need to remove async and defer to get it to work? -->
	<!-- this is currently included here and in the login component. may need to remove async and defer to get it to work? -->
	<!-- this is currently included here and in the login component. may need to remove async and defer to get it to work? -->
	<!-- this is currently included here and in the login component. may need to remove async and defer to get it to work? -->
	<!-- this is currently included here and in the login component. may need to remove async and defer to get it to work? -->
	<!-- this is currently included here and in the login component. may need to remove async and defer to get it to work? -->
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<!-- TODO: put NavBar outside of main and handle min-height accordingly -->
<main>
	<!-- <AllDrawers><slot /></AllDrawers> -->
	{#if $theme === 'trek'}
		<CustomLayout><slot /></CustomLayout>
	{:else}
		<NavBar><slot /></NavBar>
	{/if}

	<SvelteToast options={{ pausable: true }} />

	{#if $showAlgoliaSearch}
		<div class="search-modal">
			<Algolia placeholder="Search" />
		</div>
	{/if}
</main>

<style>
	main {
		min-height: 100vh;
		width: 100vw;
		overflow: hidden;
		position: relative;
	}
	.search-modal {
		--algolia-search-width: clamp(50%, 500px, 90%);
		width: var(--algolia-search-width);
		height: 500px;
		position: absolute;
		top: 10%;
		left: calc(50% - var(--algolia-search-width) / 2);
	}
</style>
