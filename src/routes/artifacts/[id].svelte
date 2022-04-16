<script context="module" lang="ts">
	import { KQL_ArtifactById } from '$lib/graphql/_kitql/graphqlStores';
	export const load = async ({ fetch, params }) => {
		await KQL_ArtifactById.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script>
	import { Layout, BasicProperty, StatusHandler } from '$lib/components/DetailPage';

	$: ({ status, errors, data } = $KQL_ArtifactById);
	$: ({ artifact } = data || {});
	$: console.log({ artifact });
</script>

<StatusHandler {status} {errors} value={artifact} entityName="artifact">
	<Layout name={artifact.name} imageId={artifact.imageId} markdownNotes={artifact.markdownNotes}>
		<svelte:fragment slot="properties">
			<BasicProperty name="Description" value={artifact.description} />
			<BasicProperty
				name="Related Items"
				value={artifact.items.edges.map((edge) => edge.node.name).join(', ')}
			/>

			<!-- {#if artifact.weapon}
				<BasicProperty name="Weapon" value={`Attack Bonus ${artifact.weapon.attackBonus}`} />
			{/if}

			{#if artifact.armor}
				<BasicProperty name="Armor" value={`AC Bonus ${artifact.armor.acBonus}`} />
			{/if}

			{#if artifact.equipment}
				<BasicProperty name="Equipment" value={artifact.equipment.briefDescription} />
			{/if} -->
		</svelte:fragment>
	</Layout>
</StatusHandler>
