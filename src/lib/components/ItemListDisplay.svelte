<svelte:options runes={true} />

<script lang="ts">
	import { fragment, graphql, type ItemListFields } from '$houdini';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import ItemTypeIcons from './ItemTypeIcons.svelte';

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
	let href = $derived(`/items/${id}`);
</script>

<ListDetailCard entity={$data} {href}>
	{#snippet titleSnippet()}
		<a {href} class="name">{name}</a>
		<ItemTypeIcons isWeapon={!!weapon} isArmor={!!armor} isEquipment={!!equipment} />
	{/snippet}
</ListDetailCard>

<style>
	.name {
		margin-right: 0.25rem;
	}
</style>
