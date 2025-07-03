<script lang="ts">
	import { PlaceNamesIdsAndTypesStore } from '$houdini';
	import { alphabeticallyBy, placeByPrecendence } from '$lib/utils';
	import { prop } from 'ramda';
	import { onMount } from 'svelte';
	import RelatedEntityMultiSelectBase from './RelatedEntityMultiSelectBase.svelte';

	const placeNamesIdsAndTypesQuery = new PlaceNamesIdsAndTypesStore();
	onMount(() => placeNamesIdsAndTypesQuery.fetch());

	interface Props {
		ids?: string[];
		id?: string;
		inputGroupName?: string;
		entityDisplayName?: string;
	}

	let {
		ids = $bindable([]),
		id = `place-select`,
		inputGroupName = 'places',
		entityDisplayName = inputGroupName
	}: Props = $props();

	let optionNamesAndIdNodes = $derived(
		$placeNamesIdsAndTypesQuery.data?.places.edges
			.map(prop('node'))
			.sort(alphabeticallyBy('name'))
			.sort(placeByPrecendence)
			.map(({ id, name, placeType }) => ({
				node: {
					id,
					name: `${name} (${placeType})`
				}
			}))
	);
	let { fetching } = $derived($placeNamesIdsAndTypesQuery);
</script>

<RelatedEntityMultiSelectBase
	{id}
	{inputGroupName}
	{fetching}
	{optionNamesAndIdNodes}
	bind:ids
	{entityDisplayName}
/>
