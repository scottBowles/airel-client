<script context="module" lang="ts">
	import { getRaces, races as queriedRaces } from '$lib/graphql/RaceQueries.gq';
	import { withToken } from '$lib/utils';
	export const load = async ({ fetch, session }) =>
		await getRaces({ fetch: withToken(fetch, session) });
</script>

<script>
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
	import { Container } from '@kahi-ui/framework';

	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';

	$: races = $queriedRaces?.races.edges?.map(({ node }) => node);
	$: console.log({ races });
</script>

<BannerImage
	overlay="Races"
	imageId={'dnd/City_guard_and_magister-5e_uk2sr0'}
	alt="associations banner"
	gravity={compass('north_east')}
/>

<div class="spacer" />

<Container>
	<div class="cards-container">
		{#each races as race}
			{@const { id, name, thumbnailId } = race}
			{@const href = `races/${id}`}
			<ListDetailCard {name} {href} {thumbnailId} />
		{/each}
	</div>
</Container>

<style>
	.spacer {
		height: 2rem;
	}

	.cards-container {
		display: grid;
		row-gap: 1rem;
	}
</style>
