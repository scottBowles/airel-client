<script lang="ts">
	import { RaceNamesAndIdsStore } from '$houdini';
	import { onMount } from 'svelte';
	import RelatedEntityMultiSelectBase from './RelatedEntityMultiSelectBase.svelte';

	const raceNamesAndIdsQuery = new RaceNamesAndIdsStore();
	onMount(() => raceNamesAndIdsQuery.fetch());

	interface Props {
		ids?: string[];
		id?: string;
		inputGroupName?: string;
		entityDisplayName?: string;
	}

	let {
		ids = $bindable([]),
		id = `race-select`,
		inputGroupName = 'races',
		entityDisplayName = inputGroupName
	}: Props = $props();

	let optionNamesAndIdNodes = $derived($raceNamesAndIdsQuery.data?.races.edges);
	let { fetching } = $derived($raceNamesAndIdsQuery);
</script>

<RelatedEntityMultiSelectBase
	{id}
	{inputGroupName}
	{entityDisplayName}
	{fetching}
	{optionNamesAndIdNodes}
	bind:ids
/>
