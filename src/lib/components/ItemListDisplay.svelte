<svelte:options runes={true} />

<script lang="ts">
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import { fromGlobalId } from '$lib/utils';
	import ItemTypeIcons from './ItemTypeIcons.svelte';
	import { fragment, graphql, type ItemListFields } from '$houdini';

	let { item }: { item: ItemListFields } = $props();

	let data = $derived(
		fragment(
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
		)
	);

	let { id, name, weapon, armor, equipment } = $derived($data);
	let globalId = $derived(fromGlobalId(id).id);
	let href = $derived(`/items/${globalId}`);
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
