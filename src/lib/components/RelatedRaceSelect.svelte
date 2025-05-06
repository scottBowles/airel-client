<script lang="ts">
	import { RaceNamesAndIdsStore } from '$houdini';
	import { onMount } from 'svelte';
	import RelatedEntitySelectBase from './RelatedEntitySelectBase.svelte';

	const raceNamesAndIdsQuery = new RaceNamesAndIdsStore();
	onMount(() => raceNamesAndIdsQuery.fetch());

	interface Props {
		initialRaceId?: string;
		id?: string;
	}

	let { initialRaceId: initialValue = '', id = `race-select` }: Props = $props();

	let optionNamesAndIdNodes = $derived($raceNamesAndIdsQuery.data?.races.edges);
	let { fetching } = $derived($raceNamesAndIdsQuery);
</script>

<RelatedEntitySelectBase {id} inputName="race" {initialValue} {optionNamesAndIdNodes} {fetching} />
