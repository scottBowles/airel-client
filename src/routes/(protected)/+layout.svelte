<svelte:options runes={true} />

<script lang="ts">
	import { navigating } from '$app/stores';
	import Algolia from '$lib/components/Algolia.svelte';
	import CustomLayout from '$lib/components/nav/CustomLayout.svelte';
	import NavBar from '$lib/components/nav/NavBar.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import { type ShowAlgoliaSearch, ThemeState } from '$lib/stores';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { getContext } from 'svelte';

	let theme = getContext<ThemeState>('theme');
	const showAlgoliaSearch = getContext<ShowAlgoliaSearch>('showAlgoliaSearch');

	// let { data } = $props();

	// let me = $derived(data.me);
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<!-- TODO: put NavBar outside of main and handle min-height accordingly -->
<main>
	<!-- <AllDrawers><slot /></AllDrawers> -->
	{#if theme.value === 'trek'}
		{theme.value}
		<CustomLayout><slot /></CustomLayout>
	{:else}
		{theme.value}
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
