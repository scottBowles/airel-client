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

	$: browser && KQL_ItemNamesAndIds.query();

	$: ({
		name,
		description,
		markdownNotes,
		items: itemsConnection,
		imageIds = [],
		lockUser,
		lockedBySelf
	} = artifact);

	$: editing = lockedBySelf || creating;
	$: items = itemsConnection?.edges.map(({ node }) => node) || [];
	$: itemsForSelect =
		$KQL_ItemNamesAndIds.status === 'DONE' &&
		$KQL_ItemNamesAndIds.data.items.edges.map(({ node: { name, id } }) => ({
			text: name,
			id
		}));
</script>

<StatusHandler {status} {errors} value={artifact} entityName="artifact">
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
			<Spacer lg />
			{#if editing}
				{#if $KQL_ItemNamesAndIds.status !== 'DONE'}
					Loading Items...
				{:else}
					<div class="spacer" />
					<DataSelect
						class="_detailbase-input"
						items={itemsForSelect}
						multiple
						placeholder="Select related items"
						logic_name="dataselect-logic-state"
						bind:logic_state={$form.items}
					/>
				{/if}
			{:else}
				<div class="items-container">
					{#each items as item}
						<ItemListDisplay {item} />
					{/each}
				</div>
			{/if}
		</svelte:fragment>
	</Layout>
</StatusHandler>

<style>
	.items-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	:global(._detailbase-input) {
		width: var(--detail-layout-input-width);
	}
</style>
