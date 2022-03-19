<script context="module" lang="ts">
	import { getNpcs, npcs as queriedNpcs } from '$lib/graphql/NpcQueries.gq';

	export async function load({ fetch }) {
		await getNpcs({ fetch });
		return {};
	}
</script>

<script>
	import { Anchor, Heading } from '@kahi-ui/framework';

	$: npcs = $queriedNpcs?.npcs.edges?.map(({ node }) => node);
	$: console.log({ npcs });
</script>

<Heading>NPCs:</Heading>
<dl>
	{#each npcs as npc}
		<dt><Anchor href={`npcs/${npc.id}`}>Name: {npc.name}</Anchor></dt>
		<dd>Description: {npc.description}</dd>
	{/each}
</dl>
