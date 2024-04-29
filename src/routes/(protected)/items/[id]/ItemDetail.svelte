<svelte:options runes={true} />

<script lang="ts">
	import { fragment, graphql, type ItemDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';
	import ItemArmorBlock from '../ItemArmorBlock.svelte';
	import ItemEquipmentBlock from '../ItemEquipmentBlock.svelte';
	import ItemWeaponBlock from '../ItemWeaponBlock.svelte';

	let { item }: { item: ItemDetailFields } = $props();

	let data = $derived(
		fragment(
			item,
			graphql(`
				fragment ItemDetailFields on Item {
					armor {
						acBonus
					}
					weapon {
						attackBonus
					}
					equipment {
						briefDescription
					}
					...ItemWeaponBlock
					...ItemArmorBlock
					...ItemEquipmentBlock
					...EntityDetailFields
				}
			`)
		)
	);

	let { armor, weapon, equipment } = $derived($data);
</script>

<LayoutDisplay entity={$data}>
	<svelte:fragment slot="properties">
		<div class="spacer"></div>
		<div class="stat-block-container">
			<!-- ARMOR STAT BLOCK -->
			{#if armor}
				<div class="stat-block">
					<ItemArmorBlock item={$data} />
				</div>
			{/if}

			<!-- WEAPON STAT BLOCK -->
			{#if weapon}
				<div class="stat-block">
					<ItemWeaponBlock item={$data} />
				</div>
			{/if}

			<!-- EQUIPMENT STAT BLOCK -->
			{#if equipment}
				<div class="stat-block">
					<ItemEquipmentBlock item={$data} />
				</div>
			{/if}
		</div>
	</svelte:fragment>
</LayoutDisplay>

<style>
	.spacer {
		height: 1rem;
	}
	.stat-block-container {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.stat-block {
		flex: 1;
		min-width: 100px;
	}
</style>
