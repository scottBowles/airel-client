<script context="module" lang="ts">
	import { getNpcById, npcById as queriedNpc } from '$lib/graphql/NpcQueries.gq';
	import { withToken } from '$lib/utils';

	export const load = async ({ fetch, params, session }) =>
		await getNpcById({ fetch: withToken(fetch, session), variables: { id: params.id } });
</script>

<script>
	import { Layout, BasicProperty } from '$lib/components/DetailPage';

	$: npc = $queriedNpc?.npc;
	$: console.log({ npc });
</script>

<Layout name={npc.name} imageId={npc.imageId}>
	<svelte:fragment slot="properties">
		<BasicProperty name="Description" value={npc.description} />
		<BasicProperty name="Race">
			<a href={`/races/${npc.race.id}`}>{npc.race.name}</a>
		</BasicProperty>
	</svelte:fragment>
</Layout>

<style>
	a {
		color: #908149;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
