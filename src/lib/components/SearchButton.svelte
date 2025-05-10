<script lang="ts">
	import { getContext } from 'svelte';
	import { algoliaCloseOnNavigation, algoliaEventListeners } from '$lib/actions';
	import type { ShowAlgoliaSearch } from '$lib/stores/initShowAlgoliaSearchStore';

	const showAlgoliaSearch = getContext<ShowAlgoliaSearch>('showAlgoliaSearch');
</script>

<svelte:body
	use:algoliaEventListeners={showAlgoliaSearch}
	use:algoliaCloseOnNavigation={showAlgoliaSearch}
/>

<fieldset class="fieldset">
	<input
		type="text"
		placeholder="Search (Ctrl + K)"
		class="input input-sm"
		onclick={showAlgoliaSearch.open}
	/>
</fieldset>
