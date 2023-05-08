<script lang="ts">
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import { fromGlobalId } from 'graphql-relay';
	import ItemTypeIcons from './ItemTypeIcons.svelte';
	import { fragment, graphql, type ItemListFields } from '$houdini';

	export let item: ItemListFields;

	$: data = fragment(
		item,
		graphql(`
			fragment ItemListFields on Item {
				id
				name
				armor {
					acBonus
				}
				weapon {
					attackBonus
				}
				equipment {
					briefDescription
				}
				...EntityListFields
			}
		`)
	);

	$: ({ id, name, weapon, armor, equipment } = $data);
	$: globalId = fromGlobalId(id).id;
	$: href = `items/${globalId}`;
</script>

<ListDetailCard entity={$data} {href}>
	<svelte:fragment slot="title">
		<a {href} class="name">{name}</a>
		<ItemTypeIcons isWeapon={!!weapon} isArmor={!!armor} isEquipment={!!equipment} />
	</svelte:fragment>
</ListDetailCard>

<style>
	.name {
		margin-right: 0.25rem;
	}
</style>
