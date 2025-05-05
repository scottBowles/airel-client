<script lang="ts">
	import { capitalize } from '$lib/utils';
	import FaPlus from 'svelte-icons/fa/FaPlus.svelte';
	import Spacer from '$lib/components/Spacer.svelte';

	interface Props {
		property: string;
		showInput?: boolean;
		children?: import('svelte').Snippet;
	}

	let { property, showInput = $bindable(false), children }: Props = $props();

	const handleAdd = () => (showInput = true);
</script>

{#if showInput}
	<h3 class="text-xl font-bold">{capitalize(property)}</h3>
	<Spacer xs />

	{@render children?.()}
{:else}
	<div class="add-block" onclick={handleAdd} onkeypress={handleAdd}>
		<div class="add-icon-container">
			<FaPlus />
		</div>
		<div class="add-block-text">Add {capitalize(property)} Stats</div>
	</div>
{/if}

<style>
	.add-block {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid oklch(var(--palette-background-bolder));
		/* border: 2px solid hsla(var(--palette-background-bolder)); */
		border-radius: 0.5rem;
		padding: 1rem;
		gap: 0.5rem;
		cursor: pointer;
	}
	.add-block:hover {
		background-color: oklch(var(--palette-background-bolder), 0.1);
		/* background-color: hsla(var(--palette-background-bolder), 0.1); */
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
