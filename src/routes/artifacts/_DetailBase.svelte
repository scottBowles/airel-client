<script lang="ts">
	import { browser } from '$app/env';
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import ItemListDisplay from '$lib/components/ItemListDisplay.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { KQL_ItemNamesAndIds } from '$lib/graphql/_kitql/graphqlStores';
	import { DataSelect } from '@kahi-ui/framework';

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
		$KQL_ItemNamesAndIds.status === 'DONE' &&
		$KQL_ItemNamesAndIds.data.items.edges.map(({ node: { name, id } }) => ({
			text: name,
			id
		}));
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
				{#if $KQL_ItemNamesAndIds.status !== 'DONE'}
					Loading Items...
				{:else}
					<div class="pt-4">
						<DataSelect
							class="_detailbase-input"
							items={itemsForSelect}
							multiple
							placeholder="Select related items"
							logic_name="dataselect-logic-state"
							bind:logic_state={$form.items}
						/>
					</div>
				{/if}
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
