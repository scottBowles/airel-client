<script lang="ts">
	import { fromGlobalId } from 'graphql-relay';
	import { parseFormData } from 'parse-nested-form-data';
	import { error } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { CreateItemStore, type CreateItem$input } from '$houdini';
	import { LayoutCreate } from '$lib/components/DetailPage';
	import AddBlock from '../AddBlock.svelte';
	import ItemArmorInputs from '../ItemArmorInputs.svelte';
	import ItemWeaponInputs from '../ItemWeaponInputs.svelte';
	import ItemEquipmentInputs from '../ItemEquipmentInputs.svelte';

	const createMutation = new CreateItemStore();

	const handleSubmit = async (event: Event) => {
		const formData = new FormData(event.target as HTMLFormElement);

		// Validate required fields
		if (!formData.get('name')) throw error(400, 'Name is required');

		// Parse nested form data
		const parsed = parseFormData(formData);

		// Split comma-separated strings into an array of strings.
		// In the event of an empty string or undefined, return an empty array.
		const logs = parsed.logs ? (parsed.logs as string)?.split(',') : [];
		const imageIds = parsed.imageIds ? (parsed.imageIds as string)?.split(',') : [];

		// Make the create request
		const data = { ...parsed, logs, imageIds } as CreateItem$input;
		const res = await createMutation.mutate(data);

		// Redirect to the new item's detail page
		if (res.data) {
			const { id: globalId } = res.data.createItem;
			const { id } = fromGlobalId(globalId);
			goto(`/items/${id}`);
		} else {
			console.log('No data returned from createMutation.mutate! res.data: ', res.data);
		}
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutCreate>
		<svelte:fragment slot="properties">
			<div class="spacer" />
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
		</svelte:fragment>
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
