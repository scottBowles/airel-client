<script context="module" lang="ts">
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import { KQL_Places } from '$lib/graphql/_kitql/graphqlStores';
	import { alphabetically, placeByPrecendence } from '$lib/utils';
	import { Container } from '@kahi-ui/framework';

	export const load = async ({ fetch }) => {
		await KQL_Places.queryLoad({ fetch });
		return {};
	};
</script>

<script>
	$: places =
		$KQL_Places.data?.places.edges
			?.map(({ node }) => node)
			.sort(alphabetically)
			.sort(placeByPrecendence) || [];
</script>

<BannerImage overlay="Places" imageId="dnd/places-banner_bwv6ut" alt="places banner" />

<div class="spacer" />

<!-- Show suns and planets in order -->

<!-- Show places in order of most to least recently updated -->

<Container>
	<div class="cards-container">
		<div>
			<AddLink href="places/create" />
		</div>
		{#each places as place (place.id)}
			{@const { id, name, description, thumbnailId, imageIds, placeTypeDisplay } = place}
			{@const href = `places/${id}`}
			<ListDetailCard
				name={`${name} (${placeTypeDisplay})`}
				{description}
				thumbnailId={thumbnailId || imageIds[0]}
				{href}
			/>
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
