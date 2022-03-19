<script context="module" lang="ts">
	import { getPlaceById, placeById as queriedPlace } from '$lib/graphql/PlaceQueries.gq';

	export async function load({ fetch, params }) {
		const { id } = params;
		const a = await getPlaceById({ fetch, variables: { id } });
		return {};
	}
</script>

<script>
	import { Heading, Text } from '@kahi-ui/framework';

	$: place = $queriedPlace?.place;
</script>

<Heading is="h1">{place.name}</Heading>
<Text>Description: {place.description}</Text>
