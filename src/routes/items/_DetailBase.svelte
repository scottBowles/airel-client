<script lang="ts">
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import AddBlock from './_AddBlock.svelte';
	import ItemArmorBlock from './_ItemArmorBlock.svelte';
	import ItemArmorForm from './_ItemArmorForm.svelte';
	import ItemEquipmentBlock from './_ItemEquipmentBlock.svelte';
	import ItemEquipmentForm from './_ItemEquipmentForm.svelte';
	import ItemWeaponBlock from './_ItemWeaponBlock.svelte';
	import ItemWeaponForm from './_ItemWeaponForm.svelte';

	export let onEditClick = () => {};
	export let onFormSubmit;
	export let onImageUpload;
	export let item = {};
	export let form;
	export let status = undefined;
	export let errors = [];
	export let creating = false;

	$: ({
		name,
		description,
		markdownNotes,
		imageIds = [],
		lockUser,
		lockedBySelf,
		armor,
		equipment,
		weapon
	} = item);
	$: editing = lockedBySelf || creating;

	function handleAddStatBlock(event) {
		const { name } = event.detail;
		$form[name] ??= {};
	}
</script>

<StatusHandler {status} {errors} value={item} entityName="item">
	<Layout
		{form}
		{name}
		{description}
		{markdownNotes}
		{imageIds}
		{lockUser}
		{lockedBySelf}
		{onEditClick}
		{onFormSubmit}
		{onImageUpload}
		{creating}
	>
		<svelte:fragment slot="properties">
			<div class="spacer" />
			<div class="stat-block-container">
				<!-- ARMOR STAT BLOCK -->
				{#if editing || armor}
					<div class="stat-block">
						{#if editing && !$form.armor}
							<AddBlock property="armor" on:addstatblock={handleAddStatBlock} />
						{:else if editing && $form.armor}
							<ItemArmorForm bind:armor={$form.armor} />
						{:else}
							<ItemArmorBlock {armor} />
						{/if}
					</div>
				{/if}

				<!-- WEAPON STAT BLOCK -->
				{#if editing || weapon}
					<div class="stat-block">
						{#if editing && !$form.weapon}
							<AddBlock property="weapon" on:addstatblock={handleAddStatBlock} />
						{:else if editing && $form.weapon}
							<ItemWeaponForm bind:weapon={$form.weapon} />
						{:else}
							<ItemWeaponBlock {weapon} />
						{/if}
					</div>
				{/if}

				<!-- EQUIPMENT STAT BLOCK -->
				{#if editing || equipment}
					<div class="stat-block">
						{#if editing && !$form.equipment}
							<AddBlock property="equipment" on:addstatblock={handleAddStatBlock} />
						{:else if editing && $form.equipment}
							<ItemEquipmentForm bind:equipment={$form.equipment} />
						{:else}
							<ItemEquipmentBlock {equipment} />
						{/if}
					</div>
				{/if}
			</div>
		</svelte:fragment>
	</Layout>
</StatusHandler>

<style>
	.spacer {
		height: 1rem;
	}
	.spacer-xs {
		height: 0.5rem;
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
