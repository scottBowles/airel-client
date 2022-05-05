<script context="module" lang="ts">
	import { KQL_PlaceById } from '$lib/graphql/_kitql/graphqlStores';

	export const load = async ({ fetch, params }) => {
		await KQL_PlaceById.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script>
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import { capitalize } from '$lib/utils';

	let place;
	let name;
	let properties;

	$: ({ status, errors, data } = $KQL_PlaceById);
	$: ({ place } = data || {});
	$: ({ name, imageIds } = place || {});
	$: properties = {
		Description: place.description,
		Type: capitalize(place.placeType),
		Population: place.population
	};
	$: console.log({ place });
</script>

<StatusHandler {status} {errors} value={place} entityName="place">
	<Layout {name} imageId={imageIds[0]} {properties} markdownNotes={place.markdownNotes} />
</StatusHandler>
