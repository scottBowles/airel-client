<script lang="ts">
	import { ItemNamesAndIdsStore } from '$houdini';
	import MultiSelect from '$lib/components/MultiSelect.svelte';
	import { onMount } from 'svelte';

	const itemNamesAndIdsQuery = new ItemNamesAndIdsStore();

	onMount(() => itemNamesAndIdsQuery.fetch());

	export let id = `artifact-item-select`;
	export let initialItemIds: string[] = [];

	let selectedItems: string[] = [];

	$: itemsForSelect =
		$itemNamesAndIdsQuery.data?.items.edges.map((edge) => ({
			value: edge.node.id,
			label: edge.node.name
		})) || [];
</script>

<div class="form-control w-full max-w-xs">
	<label class="label" for={id}>
		<span class="label-text">Select Related Items</span>
	</label>
	{#if $itemNamesAndIdsQuery.fetching}
		Loading Items...
	{:else}
		<MultiSelect
			{id}
			options={itemsForSelect}
			initialValues={initialItemIds}
			bind:values={selectedItems}
		/>
	{/if}
	{#each selectedItems as itemId, i}
		<input type="hidden" name={`items.set[${i}].id`} value={itemId} />
	{/each}
</div>
