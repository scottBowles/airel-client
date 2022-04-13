<script context="module" lang="ts">
	import {
		getArtifactById,
		artifactById as queriedArtifact
	} from '$lib/graphql/ArtifactQueries.gq';

	export const load = async ({ fetch, params }) =>
		await getArtifactById({ fetch, variables: { id: params.id } });
</script>

<script>
	import { Layout, BasicProperty, StatusHandler } from '$lib/components/DetailPage';

	$: ({ gQueryStatus, artifact, errors } = $queriedArtifact);
	$: console.log({ artifact });
</script>

<StatusHandler status={gQueryStatus} {errors} value={artifact} entityName="artifact">
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
