<script context="module" lang="ts">
	import { getItemById, itemById as queriedItem } from '$lib/graphql/ItemQueries.gq';
	import { withToken } from '$lib/utils';

	export const load = async ({ fetch, params, session }) =>
		await getItemById({ fetch: withToken(fetch, session), variables: { id: params.id } });
</script>

<script>
	import { Layout, BasicProperty, StatusHandler } from '$lib/components/DetailPage';

	$: ({ gQueryStatus, item, errors } = $queriedItem);
	$: console.log({ item });
</script>

<StatusHandler status={gQueryStatus} {errors} value={item} entityName="item">
	<Layout name={item.name} imageId={item.imageId} markdownNotes={item.markdownNotes}>
		<svelte:fragment slot="properties">
			<BasicProperty name="Description" value={item.description} />

			{#if item.weapon}
				<BasicProperty name="Weapon" value={`Attack Bonus ${item.weapon.attackBonus}`} />
			{/if}

			{#if item.armor}
				<BasicProperty name="Armor" value={`AC Bonus ${item.armor.acBonus}`} />
			{/if}

			{#if item.equipment}
				<BasicProperty name="Equipment" value={item.equipment.briefDescription} />
			{/if}
		</svelte:fragment>
	</Layout>
</StatusHandler>
