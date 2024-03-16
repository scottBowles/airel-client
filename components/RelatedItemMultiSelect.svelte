<script lang="ts">
	import { browser } from '$app/environment';
	import { ItemNamesAndIdsStore } from '$houdini';
	import RelatedEntityMultiSelectBase from './RelatedEntityMultiSelectBase.svelte';

	const itemNamesAndIdsQuery = new ItemNamesAndIdsStore();
	$: browser && itemNamesAndIdsQuery.fetch();

	export let ids: string[] = [];
	export let id = `item-select`;
	export let inputGroupName = 'items';
	export let entityDisplayName = inputGroupName;

	$: optionNamesAndIdNodes = $itemNamesAndIdsQuery.data?.items.edges;
	$: ({ fetching } = $itemNamesAndIdsQuery);
</script>

<RelatedEntityMultiSelectBase
	{id}
	{inputGroupName}
	{entityDisplayName}
	{fetching}
	{optionNamesAndIdNodes}
	bind:ids
/>
