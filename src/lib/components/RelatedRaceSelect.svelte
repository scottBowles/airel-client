<script lang="ts">
	import { browser } from '$app/environment';
	import { RaceNamesAndIdsStore } from '$houdini';
	import RelatedEntitySelectBase from './RelatedEntitySelectBase.svelte';

	const raceNamesAndIdsQuery = new RaceNamesAndIdsStore();
	$: browser && raceNamesAndIdsQuery.fetch();

	let initialValue = '';
	export { initialValue as initialRaceId };
	export let id = `race-select`;

	$: optionNamesAndIdNodes = $raceNamesAndIdsQuery.data?.races.edges;
	$: ({ fetching } = $raceNamesAndIdsQuery);
</script>

<RelatedEntitySelectBase {id} inputName="race" {initialValue} {optionNamesAndIdNodes} {fetching} />
