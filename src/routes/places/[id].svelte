<script context="module" lang="ts">
	import { getPlaceById, placeById as queriedPlace } from '$lib/graphql/PlaceQueries.gq';
	import { withToken } from '$lib/utils';

	export const load = async ({ fetch, params, session }) =>
		await getPlaceById({ fetch: withToken(fetch, session), variables: { id: params.id } });
</script>

<script>
	import { Layout } from '$lib/components/DetailPage';
	import { capitalize } from '$lib/utils';

	let place;
	let name;
	let properties;

	$: place = $queriedPlace?.place;
	$: name = place.name;
	$: imageId = place.imageId;
	$: properties = {
		Description: place.description,
		Type: capitalize(place.placeType),
		Population: place.population
	};
	$: console.log({ place });
</script>

<Layout {name} {imageId} {properties} />
