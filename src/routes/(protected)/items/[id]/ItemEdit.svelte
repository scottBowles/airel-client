<script lang="ts">
	import { fragment, graphql, UpdateItemStore, type ItemEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';
	import AddBlock from '../AddBlock.svelte';
	import ItemArmorInputs from '../ItemArmorInputs.svelte';
	import ItemEquipmentInputs from '../ItemEquipmentInputs.svelte';
	import ItemWeaponInputs from '../ItemWeaponInputs.svelte';
	import { parseFormData } from 'parse-nested-form-data';

	const updateItem = new UpdateItemStore();

	export let item: ItemEditFields;

	$: data = fragment(
		item,
		graphql(`
			fragment ItemEditFields on Item {
				id
				armor {
					acBonus
				}
				weapon {
					attackBonus
				}
				equipment {
					briefDescription
				}

				...EntityEditFields
			}
		`)
	);

	$: ({ id, armor, weapon, equipment } = $data);

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		console.log({ parsed });

		updateItem.mutate({
			id,
			...parsed
		});
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutEdit entity={$data}>
		<svelte:fragment slot="properties">
			<div class="spacer" />
			<div class="stat-block-container">
				<!-- ARMOR STAT BLOCK -->
				<div class="stat-block">
					<AddBlock property="armor" showInput={!!armor}>
						<ItemArmorInputs {armor} />
					</AddBlock>
				</div>

				<!-- WEAPON STAT BLOCK -->
				<div class="stat-block">
					<AddBlock property="weapon" showInput={!!weapon}>
						<ItemWeaponInputs {weapon} />
					</AddBlock>
				</div>

				<!-- EQUIPMENT STAT BLOCK -->
				<div class="stat-block">
					<AddBlock property="equipment" showInput={!!equipment}>
						<ItemEquipmentInputs {equipment} />
					</AddBlock>
				</div>
			</div>
		</svelte:fragment>
	</LayoutEdit>
</form>

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
