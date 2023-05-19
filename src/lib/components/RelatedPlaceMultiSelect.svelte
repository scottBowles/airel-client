<script lang="ts">
	import { browser } from '$app/environment';
	import { PlaceNamesIdsAndTypesStore } from '$houdini';
	import { alphabeticallyBy, placeByPrecendence } from '$lib/utils';
	import RelatedEntityMultiSelectBase from './RelatedEntityMultiSelectBase.svelte';
	import { prop } from 'ramda';

	const placeNamesIdsAndTypesQuery = new PlaceNamesIdsAndTypesStore();
	$: browser && placeNamesIdsAndTypesQuery.fetch();

	let initialValues: string[] = [];
	export { initialValues as initialPlaceIds };
	export let id = `place-select`;
	export let name = 'places';
	export let displayName = name;

	$: optionNamesAndIdNodes = $placeNamesIdsAndTypesQuery.data?.places.edges
		.map(prop('node'))
		.sort(alphabeticallyBy('name'))
		.sort(placeByPrecendence)
		.map(({ id, name, placeType }) => ({
			node: {
				id,
				name: `${name} (${placeType})`
			}
		}));
	$: ({ fetching } = $placeNamesIdsAndTypesQuery);
</script>

<RelatedEntityMultiSelectBase
	{id}
	inputGroupName={name}
	{fetching}
	{optionNamesAndIdNodes}
	{initialValues}
	entityDisplayName={displayName}
/>
