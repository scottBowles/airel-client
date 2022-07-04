<script lang="ts">
	import { Button } from '@kahi-ui/framework';

	import { algoliaCloseOnNavigation, algoliaEventListeners } from '$lib/actions';
	import { showAlgoliaSearch } from '$lib/stores';
</script>

<svelte:body use:algoliaEventListeners use:algoliaCloseOnNavigation />

<Button on:click={showAlgoliaSearch.open}>Search (CTRL + K)</Button>
