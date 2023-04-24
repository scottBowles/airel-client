<script lang="ts">
	import { browser } from '$app/environment';
	import { RaceNamesAndIdsStore } from '$houdini';
	import RelatedEntityMultiSelectBase from './RelatedEntityMultiSelectBase.svelte';

	const raceNamesAndIdsQuery = new RaceNamesAndIdsStore();
	$: browser && raceNamesAndIdsQuery.fetch();

	let initialValues: string[] = [];
	export { initialValues as initialRaceIds };
	export let id = `race-select`;

	$: optionNamesAndIdNodes = $raceNamesAndIdsQuery.data?.races.edges;
	$: ({ fetching } = $raceNamesAndIdsQuery);
</script>

<RelatedEntityMultiSelectBase
	{id}
	inputGroupName="races"
	{fetching}
	{optionNamesAndIdNodes}
	{initialValues}
/>
