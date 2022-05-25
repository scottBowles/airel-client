<script lang="ts">
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import { Heading } from '@kahi-ui/framework';
	import AddBlock from './_AddBlock.svelte';
	import ArmorBlock from './_ArmorBlock.svelte';
	import EquipmentBlock from './_EquipmentBlock.svelte';
	import WeaponBlock from './_WeaponBlock.svelte';
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
						<Heading is="h5">Armor</Heading>
						<div class="spacer-xs" />
						{#if editing && !$form.armor}
							<AddBlock property="armor" on:addstatblock={handleAddStatBlock} />
						{:else}
							<ArmorBlock {armor} {form} {editing} />
						{/if}
					</div>
				{/if}

				<!-- WEAPON STAT BLOCK -->
				{#if editing || weapon}
					<div class="stat-block">
						<Heading is="h5">Weapon</Heading>
						<div class="spacer-xs" />
						{#if editing && !$form.weapon}
							<AddBlock property="weapon" on:addstatblock={handleAddStatBlock} />
						{:else}
							<WeaponBlock {weapon} {form} {editing} />
						{/if}
					</div>
				{/if}

				<!-- EQUIPMENT STAT BLOCK -->
				{#if editing || equipment}
					<div class="stat-block">
						<Heading is="h5">Equipment</Heading>
						<div class="spacer-xs" />
						{#if editing && !$form.equipment}
							<AddBlock property="equipment" on:addstatblock={handleAddStatBlock} />
						{:else}
							<EquipmentBlock {equipment} {form} {editing} />
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
