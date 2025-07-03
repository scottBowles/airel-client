<script lang="ts">
	import { ItemNamesAndIdsStore } from '$houdini';
	import { onMount } from 'svelte';
	import RelatedEntityMultiSelectBase from './RelatedEntityMultiSelectBase.svelte';

	const itemNamesAndIdsQuery = new ItemNamesAndIdsStore();
	onMount(() => itemNamesAndIdsQuery.fetch());

	interface Props {
		ids?: string[];
		id?: string;
		inputGroupName?: string;
		entityDisplayName?: string;
	}

	let {
		ids = $bindable([]),
		id = `item-select`,
		inputGroupName = 'items',
		entityDisplayName = inputGroupName
	}: Props = $props();

	let optionNamesAndIdNodes = $derived($itemNamesAndIdsQuery.data?.items.edges);
	let { fetching } = $derived($itemNamesAndIdsQuery);
</script>

<RelatedEntityMultiSelectBase
	{id}
	{inputGroupName}
	{entityDisplayName}
	{fetching}
	{optionNamesAndIdNodes}
	bind:ids
/>
