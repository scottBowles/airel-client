<script>
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import { KQL_Npcs } from '$lib/graphql/_kitql/graphqlStores';
	import { alphabetically } from '$lib/utils';

	$: npcs = $KQL_Npcs.data?.npcs.edges?.map(({ node }) => node).sort(alphabetically) || [];
</script>

<BannerImage overlay="Characters" imageId="dnd/places-banner_bwv6ut" alt="places banner" />

<div class="container mx-auto mt-12 mb-32 grid gap-y-4">
	<div><AddLink href="characters/create" /></div>

	{#each npcs as npc (npc.id)}
		{@const { id, name, description, thumbnailId, imageIds } = npc}
		{@const href = `characters/${id}`}
		<ListDetailCard {name} {description} thumbnailId={thumbnailId || imageIds[0]} {href} />
	{/each}
</div>
