<script>
	import { capitalize } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';
	import FaPlus from 'svelte-icons/fa/FaPlus.svelte';

	export let property;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('addstatblock', { name: property });
	}
</script>

<div class="add-block" on:click={handleClick}>
	<div class="add-icon-container">
		<FaPlus />
	</div>
	<div class="add-block-text">Add {capitalize(property)} Stats</div>
</div>

<style>
	.add-block {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid hsla(var(--palette-background-bolder));
		border-radius: 0.5rem;
		padding: 1rem;
		gap: 0.5rem;
		cursor: pointer;
	}
	.add-block:hover {
		background-color: hsla(var(--palette-background-bolder), 0.1);
	}
	.add-icon-container {
		--dimension: 1.25rem;
		height: var(--dimension);
		width: var(--dimension);
		display: inline-block;
	}
	.add-block-text {
		text-align: center;
	}
</style>
