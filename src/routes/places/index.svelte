<script context="module" lang="ts">
	import { getPlaces, places as queriedPlaces } from '$lib/graphql/PlaceQueries.gq';
	export const load = async ({ fetch }) => await getPlaces({ fetch });
</script>

<script>
	import { Container } from '@kahi-ui/framework';

	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';

	$: places = $queriedPlaces?.places.edges?.map(({ node }) => node).filter(Boolean);
	$: console.log({ places });
</script>

<BannerImage overlay="Places" imageId="dnd/places-banner_bwv6ut" alt="places banner" />

<div class="spacer" />

<!-- Show suns and planets in order -->

<!-- Show places in order of most to least recently updated -->

<Container>
	<div class="cards-container">
		{#each places as place}
			{@const { id, name, description } = place}
			{@const href = `places/${id}`}
			<ListDetailCard {name} {description} {href} />
		{/each}
	</div>
</Container>

<style>
	.cards-container {
		display: grid;
		row-gap: 1rem;
	}

	.spacer {
		height: 2rem;
	}
</style>
