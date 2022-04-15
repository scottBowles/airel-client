<script context="module" lang="ts">
	import { KQL_Places } from '$lib/graphql/_kitql/graphqlStores';
	export const load = async ({ fetch }) => {
		await KQL_Places.queryLoad({ fetch });
		return {};
	};
</script>

<script>
	import { Container } from '@kahi-ui/framework';

	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';

	$: places = $KQL_Places.data?.places.edges?.map(({ node }) => node) || [];
	$: ({ status } = $KQL_Places);
	$: console.log({ places });
</script>

<BannerImage overlay="Places" imageId="dnd/places-banner_bwv6ut" alt="places banner" />

<div class="spacer" />

<!-- Show suns and planets in order -->

<!-- Show places in order of most to least recently updated -->

<Container>
	<div class="cards-container">
		{#each places as place}
			{@const { id, name, description, thumbnailId } = place}
			{@const href = `places/${id}`}
			<ListDetailCard {name} {description} {thumbnailId} {href} />
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
