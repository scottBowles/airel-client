<script lang="ts">
	import { goto } from '$app/navigation';
	import { CreateItemStore } from '$houdini';
	import { LayoutCreate } from '$lib/components/DetailPage';
	import { error } from '@sveltejs/kit';
	import { parseFormData } from 'parse-nested-form-data';
	import AddBlock from '../AddBlock.svelte';
	import ItemArmorInputs from '../ItemArmorInputs.svelte';
	import ItemEquipmentInputs from '../ItemEquipmentInputs.svelte';
	import ItemWeaponInputs from '../ItemWeaponInputs.svelte';

	const createMutation = new CreateItemStore();

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(formData);
		const name = parsed.name as string | undefined;

		if (!name) error(400, 'Name is required');

		const res = await createMutation.mutate({ ...parsed, name });

		// Redirect to the new item's detail page
		if (res.data?.createItem.__typename === 'Item') {
			const { id } = res.data.createItem;
			goto(`/items/${id}`);
		} else {
			console.log('No data returned from createMutation.mutate! res.data: ', res.data);
		}
	};
</script>

<form method="POST" onsubmit={handleSubmit}>
	<LayoutCreate>
		{#snippet properties()}
			<div class="spacer"></div>
			<div class="stat-block-container">
				<!-- ARMOR STAT BLOCK -->
				<div class="stat-block">
					<AddBlock property="armor">
						<ItemArmorInputs />
					</AddBlock>
				</div>

				<!-- WEAPON STAT BLOCK -->
				<div class="stat-block">
					<AddBlock property="weapon">
						<ItemWeaponInputs />
					</AddBlock>
				</div>

				<!-- EQUIPMENT STAT BLOCK -->
				<div class="stat-block">
					<AddBlock property="equipment">
						<ItemEquipmentInputs />
					</AddBlock>
				</div>
			</div>
		{/snippet}
	</LayoutCreate>
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
