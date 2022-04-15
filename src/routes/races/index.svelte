<script context="module" lang="ts">
	import { KQL_Races } from '$lib/graphql/_kitql/graphqlStores';
	export const load = async ({ fetch }) => {
		await KQL_Races.queryLoad({ fetch });
		return {};
	};
</script>

<script>
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
	import { Container } from '@kahi-ui/framework';

	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';

	$: races = $KQL_Races.data?.races.edges?.map(({ node }) => node) || [];
	$: ({ status } = $KQL_Races);
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
