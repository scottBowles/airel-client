<script context="module" lang="ts">
	import { KQL_NpcById } from '$lib/graphql/_kitql/graphqlStores';

	export const load = async ({ fetch, params }) => {
		await KQL_NpcById.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script>
	import { Layout, BasicProperty, StatusHandler } from '$lib/components/DetailPage';

	$: ({ status, errors, data } = $KQL_NpcById);
	$: ({ npc } = data || {});
</script>

<StatusHandler {status} {errors} value={npc} entityName="NPC">
	<Layout name={npc.name} imageId={npc.imageId} markdownNotes={npc.markdownNotes}>
		<svelte:fragment slot="properties">
			<BasicProperty name="Description" value={npc.description} />
			<BasicProperty name="Race">
				<a href={`/races/${npc.race.id}`} sveltekit:prefetch>{npc.race.name}</a>
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
