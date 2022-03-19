<script context="module" lang="ts">
	import { getPlaces, places as queriedPlaces } from '$lib/graphql/PlaceQueries.gq';

	export async function load({ fetch }) {
		await getPlaces({ fetch });
		return {};
	}
</script>

<script>
	import { Anchor, Heading } from '@kahi-ui/framework';

	$: places = $queriedPlaces?.places.edges?.map(({ node }) => node).filter(Boolean);
	$: console.log({ places });
</script>

<Heading>Places:</Heading>
<dl>
	{#each places as place}
		<dt><Anchor href={`places/${place.id}`}>Name: {place.name}</Anchor></dt>
		<dd>Description: {place.description}</dd>
	{/each}
</dl>
