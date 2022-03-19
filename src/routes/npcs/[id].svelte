<script context="module" lang="ts">
	import { getNpcById, npcById as queriedNpc } from '$lib/graphql/NpcQueries.gq';

	export async function load({ fetch, params }) {
		const { id } = params;
		const a = await getNpcById({ fetch, variables: { id } });
		return {};
	}
</script>

<script>
	import { Heading, Text } from '@kahi-ui/framework';

	$: npc = $queriedNpc?.npc;
</script>

<Heading is="h1">{npc.name}</Heading>
<Text>Description: {npc.description}</Text>
