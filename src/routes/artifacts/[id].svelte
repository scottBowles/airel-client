<script context="module" lang="ts">
	import {
		getArtifactById,
		artifactById as queriedArtifact
	} from '$lib/graphql/ArtifactQueries.gq';
	import { withToken } from '$lib/utils';

	export const load = async ({ fetch, params, session }) =>
		await getArtifactById({ fetch: withToken(fetch, session), variables: { id: params.id } });
</script>

<script>
	import { Layout, BasicProperty } from '$lib/components/DetailPage';

	$: artifact = $queriedArtifact?.artifact;
	$: console.log({ artifact });
</script>

<Layout name={artifact.name} imageId={artifact.imageId}>
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
