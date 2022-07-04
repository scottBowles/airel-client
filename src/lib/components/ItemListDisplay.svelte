<script>
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import ItemTypeIcons from './ItemTypeIcons.svelte';

	export let item;

	$: ({ id, name, description, thumbnailId, imageIds, weapon, armor, equipment } = item);
	$: href = `/items/${id}`;
</script>

<ListDetailCard {description} thumbnailId={thumbnailId || imageIds[0]}>
	<svelte:fragment slot="title">
		<a {href} sveltekit:prefetch class="name">{name}</a>
		<ItemTypeIcons isWeapon={weapon} isArmor={armor} isEquipment={equipment} />
	</svelte:fragment>
</ListDetailCard>

<style>
	.name {
		margin-right: 0.25rem;
	}
</style>
