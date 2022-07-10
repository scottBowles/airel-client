<script lang="ts">
	import { algoliaCloseOnNavigation, algoliaEventListeners } from '$lib/actions';
	import { showAlgoliaSearch } from '$lib/stores';
</script>

<svelte:body use:algoliaEventListeners use:algoliaCloseOnNavigation />

<div class="form-control">
	<input
		type="text"
		placeholder="Search (Ctrl + K)"
		class="input input-sm input-bordered"
		on:click={showAlgoliaSearch.open}
	/>
</div>
