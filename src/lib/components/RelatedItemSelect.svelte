<script lang="ts">
	import { browser } from '$app/environment';
	import { ItemNamesAndIdsStore } from '$houdini';
	import RelatedEntitySelectBase from './RelatedEntitySelectBase.svelte';

	const itemNamesAndIdsQuery = new ItemNamesAndIdsStore();
	$: browser && itemNamesAndIdsQuery.fetch();

	let initialValues: string[] = [];
	export { initialValues as initialItemIds };
	export let id = `artifact-item-select`;

	$: optionNamesAndIdNodes = $itemNamesAndIdsQuery.data?.items.edges;
	$: ({ fetching } = $itemNamesAndIdsQuery);
</script>

<RelatedEntitySelectBase
	{id}
	inputGroupName="items"
	{fetching}
	{optionNamesAndIdNodes}
	{initialValues}
/>
