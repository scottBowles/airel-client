<script context="module" lang="ts">
	import { getPlaceById, placeById as queriedPlace } from '$lib/graphql/PlaceQueries.gq';

	export const load = async ({ fetch, params }) =>
		await getPlaceById({ fetch, variables: { id: params.id } });
</script>

<script>
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import { capitalize } from '$lib/utils';

	let place;
	let name;
	let properties;

	$: ({ gQueryStatus, place, errors } = $queriedPlace);
	$: name = place.name;
	$: imageId = place.imageId;
	$: properties = {
		Description: place.description,
		Type: capitalize(place.placeType),
		Population: place.population
	};
	$: console.log({ place });
</script>

<StatusHandler status={gQueryStatus} {errors} value={place} entityName="place">
	<Layout {name} {imageId} {properties} markdownNotes={place.markdownNotes} />
</StatusHandler>
