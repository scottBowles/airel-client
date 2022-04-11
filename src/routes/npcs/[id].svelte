<script context="module" lang="ts">
	import { getNpcById, npcById as queriedNpc } from '$lib/graphql/NpcQueries.gq';
	import { withToken } from '$lib/utils';

	export const load = async ({ fetch, params, session }) =>
		await getNpcById({ fetch: withToken(fetch, session), variables: { id: params.id } });
</script>

<script>
	import { Layout, BasicProperty, StatusHandler } from '$lib/components/DetailPage';

	$: ({ gQueryStatus, npc, errors } = $queriedNpc);
</script>

<StatusHandler status={gQueryStatus} {errors} value={npc} entityName="NPC">
	<Layout name={npc.name} imageId={npc.imageId} markdownNotes={npc.markdownNotes}>
		<svelte:fragment slot="properties">
			<BasicProperty name="Description" value={npc.description} />
			<BasicProperty name="Race">
				<a href={`/races/${npc.race.id}`}>{npc.race.name}</a>
			</BasicProperty>
		</svelte:fragment>
	</Layout>
</StatusHandler>

<style>
	a {
		color: #908149;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
