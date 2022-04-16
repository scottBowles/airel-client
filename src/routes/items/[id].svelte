<script context="module" lang="ts">
	import { KQL_ItemById } from '$lib/graphql/_kitql/graphqlStores';

	export const load = async ({ fetch, params }) => {
		await KQL_ItemById.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script>
	import { Layout, BasicProperty, StatusHandler } from '$lib/components/DetailPage';

	$: ({ status, errors, data } = $KQL_ItemById);
	$: ({ item } = data || {});
	$: console.log({ item });
</script>

<StatusHandler {status} {errors} value={item} entityName="item">
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
