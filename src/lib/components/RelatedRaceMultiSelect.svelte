<script lang="ts">
	import { browser } from '$app/environment';
	import { RaceNamesAndIdsStore } from '$houdini';
	import RelatedEntityMultiSelectBase from './RelatedEntityMultiSelectBase.svelte';

	const raceNamesAndIdsQuery = new RaceNamesAndIdsStore();
	$: browser && raceNamesAndIdsQuery.fetch();

	export let ids: string[] = [];
	export let id = `race-select`;
	export let inputGroupName = 'races';
	export let entityDisplayName = inputGroupName;

	$: optionNamesAndIdNodes = $raceNamesAndIdsQuery.data?.races.edges;
	$: ({ fetching } = $raceNamesAndIdsQuery);
</script>

<RelatedEntityMultiSelectBase
	{id}
	{inputGroupName}
	{entityDisplayName}
	{fetching}
	{optionNamesAndIdNodes}
	bind:ids
/>
