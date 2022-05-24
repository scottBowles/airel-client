<script lang="ts">
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import ArmorBlock from './_ArmorBlock.svelte';
	import EquipmentBlock from './_EquipmentBlock.svelte';
	import WeaponBlock from './_WeaponBlock.svelte';

	export let onEditClick = () => {};
	export let onFormSubmit;
	export let onImageUpload;
	export let item;
	export let status = undefined;
	export let errors = [];
	export let creating = false;

	$: ({ imageIds = [], lockUser, lockedBySelf, armor, equipment, weapon } = $item || {});
</script>

<StatusHandler {status} {errors} value={$item} entityName="item">
	<Layout
		bind:name={$item.name}
		bind:description={$item.description}
		bind:markdownNotes={$item.markdownNotes}
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
				{#if armor}
					<div class="stat-block">
						<ArmorBlock {...armor} />
					</div>
				{/if}
				{#if weapon}
					<div class="stat-block">
						<WeaponBlock {...weapon} />
					</div>
				{/if}
				{#if equipment}
					<div class="stat-block">
						<EquipmentBlock {...equipment} />
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
	.stat-block-container {
		display: flex;
	}
	.stat-block {
		flex: 1;
	}
</style>
