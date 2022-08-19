<script lang="ts">
	import { browser } from '$app/env';
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import ItemListDisplay from '$lib/components/ItemListDisplay.svelte';
	import MultiSelect from '$lib/components/MultiSelect.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { KQL_ItemNamesAndIds } from '$lib/graphql/_kitql/graphqlStores';

	export let onEditClick = () => {};
	export let onFormSubmit;
	export let onImageUpload;
	export let artifact = {};
	export let form;
	export let status = undefined;
	export let errors = [];
	export let creating = false;
	export let patchStore = undefined;

	$: browser && KQL_ItemNamesAndIds.query();

	$: ({
		id,
		name,
		description,
		markdownNotes,
		logs,
		items: itemsConnection,
		imageIds = [],
		lockUser,
		lockedBySelf
	} = artifact || {});

	$: editing = lockedBySelf || creating;
	$: items = itemsConnection?.edges.map(({ node }) => node) || [];
	$: itemsForSelect =
		$KQL_ItemNamesAndIds.status === 'DONE'
			? $KQL_ItemNamesAndIds.data.items.edges.map(({ node }) => ({
					label: node.name,
					value: node.id
			  }))
			: [];
	$: itemIds = items.map((item) => item.id);
	$: itemSelectId = `artifact-${id}-item-select`;
</script>

<StatusHandler {creating} {status} {errors} value={artifact} entityName="artifact">
	<Layout
		{id}
		{form}
		{name}
		{description}
		{markdownNotes}
		{imageIds}
		{logs}
		{lockUser}
		{lockedBySelf}
		{onEditClick}
		{onFormSubmit}
		{onImageUpload}
		{patchStore}
		{creating}
	>
		<svelte:fragment slot="properties">
			<Spacer lg />
			{#if editing}
				<div class="form-control w-full max-w-xs">
					<label class="label" for={itemSelectId}>
						<span class="label-text">Select Related Items</span>
					</label>
					{#if $KQL_ItemNamesAndIds.status !== 'DONE'}
						Loading Items...
					{:else}
						<MultiSelect
							id={itemSelectId}
							options={itemsForSelect}
							initialValues={itemIds}
							bind:values={$form.items}
						/>
					{/if}
				</div>
			{:else}
				<div class="flex flex-col gap-4">
					{#each items as item}
						<ItemListDisplay {item} />
					{/each}
				</div>
			{/if}
		</svelte:fragment>
	</Layout>
</StatusHandler>

<style>
	:global(._detailbase-input) {
		width: var(--detail-layout-input-width);
	}
</style>
