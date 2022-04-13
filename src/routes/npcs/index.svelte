<script context="module" lang="ts">
	import { getNpcs, npcs as queriedNpcs } from '$lib/graphql/NpcQueries.gq';
	export const load = async ({ fetch }) => await getNpcs({ fetch });
</script>

<script>
	import { Container } from '@kahi-ui/framework';

	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';

	$: npcs = $queriedNpcs?.npcs.edges?.map(({ node }) => node);
	$: console.log({ npcs });
</script>

<BannerImage overlay="NPCs" imageId="dnd/places-banner_bwv6ut" alt="places banner" />

<div class="spacer" />

<Container>
	<div class="cards-container">
		{#each npcs as npc}
			{@const { id, name, description, thumbnailId } = npc}
			{@const href = `npcs/${id}`}
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
