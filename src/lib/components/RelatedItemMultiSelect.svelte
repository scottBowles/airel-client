<script lang="ts">
	import { browser } from '$app/environment';
	import { ItemNamesAndIdsStore } from '$houdini';
	import RelatedEntityMultiSelectBase from './RelatedEntityMultiSelectBase.svelte';

	const itemNamesAndIdsQuery = new ItemNamesAndIdsStore();
	$: browser && itemNamesAndIdsQuery.fetch();

	let initialValues: string[] = [];
	export { initialValues as initialItemIds };
	export let id = `item-select`;

	$: optionNamesAndIdNodes = $itemNamesAndIdsQuery.data?.items.edges;
	$: ({ fetching } = $itemNamesAndIdsQuery);
</script>

<RelatedEntityMultiSelectBase
	{id}
	inputGroupName="items"
	{fetching}
	{optionNamesAndIdNodes}
	{initialValues}
/>
