<script context="module" lang="ts">
	import { getPlaces, places as queriedPlaces } from '$lib/graphql/PlaceQueries.gq';

	export async function load({ fetch }) {
		await getPlaces({ fetch });
		return {};
	}
</script>

<script>
	import BannerImage from '$lib/components/BannerImage.svelte';
	import { Anchor, Container, Heading } from '@kahi-ui/framework';

	$: places = $queriedPlaces?.places.edges?.map(({ node }) => node).filter(Boolean);
	$: console.log({ places });
</script>

<BannerImage overlay="Places" imageId="dnd/places-banner_bwv6ut" alt="places banner" />

<div class="spacer" />

<!-- Show suns and planets in order -->

<!-- Show places in order of most to least recently updated -->

<Container>
	<dl>
		{#each places as place}
			<dt><a href={`places/${place.id}`}>{place.name}</a></dt>
			<dd>{place.description}</dd>
		{/each}
	</dl>
</Container>

<style>
	.spacer {
		height: 2rem;
	}

	a {
		color: #908149;
	}

	a:hover {
		text-decoration: underline;
	}

	dt {
		font-weight: bold;
	}

	dt:not(:first-child) {
		margin-top: 1rem;
	}
</style>
