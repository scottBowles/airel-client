<script context="module" lang="ts">
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import { KQL_Npcs } from '$lib/graphql/_kitql/graphqlStores';
	import { Container } from '@kahi-ui/framework';
	export const load = async ({ fetch }) => {
		await KQL_Npcs.queryLoad({ fetch });
		return {};
	};
</script>

<script>
	$: npcs = $KQL_Npcs.data?.npcs.edges?.map(({ node }) => node) || [];
</script>

<BannerImage overlay="Characters" imageId="dnd/places-banner_bwv6ut" alt="places banner" />

<div class="spacer" />

<Container>
	<div class="cards-container">
		<div>
			<AddLink href="characters/create" />
		</div>
		{#each npcs as npc}
			{@const { id, name, description, thumbnailId, imageIds } = npc}
			{@const href = `characters/${id}`}
			<ListDetailCard {name} {description} thumbnailId={thumbnailId || imageIds[0]} {href} />
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
