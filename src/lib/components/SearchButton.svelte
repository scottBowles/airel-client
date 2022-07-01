<script lang="ts">
	import Algolia from '$lib/components/Algolia.svelte';
	import { Button } from '@kahi-ui/framework';
	import { onDestroy, onMount } from 'svelte';

	let showAlgoliaSearch = false;
	const openSearch = () => (showAlgoliaSearch = true);
	const closeSearch = () => (showAlgoliaSearch = false);

	function searchEventListener(event) {
		if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
			openSearch();
		}
		if (event.key === 'Escape') {
			closeSearch();
		}
	}

	function addEventListeners() {
		try {
			document.addEventListener('keydown', searchEventListener);
		} catch (e) {
			console.error(e);
		}
	}
	function removeEventListeners() {
		try {
			document.removeEventListener('keydown', searchEventListener);
		} catch (e) {
			console.error(e);
		}
	}

	onMount(() => document && addEventListeners());
	onDestroy(removeEventListeners);
</script>

<svelte:body on:load={addEventListeners} />

<Button on:click={openSearch}>Search (CTRL + K)</Button>

{#if showAlgoliaSearch}
	<div class="search-modal">
		<Algolia placeholder="Search" />
	</div>
{/if}

<style>
	.search-modal {
		--algolia-search-width: clamp(50%, 500px, 90%);
		width: var(--algolia-search-width);
		height: 500px;
		position: absolute;
		top: 10%;
		left: calc(50% - var(--algolia-search-width) / 2);
	}
</style>
