<script lang="ts">
	import { browser } from '$app/env';
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import Spacer from '$lib/components/Spacer.svelte';
	import {
		KQL_AssociationNamesAndIds,
		KQL_RaceNamesAndIds
	} from '$lib/graphql/_kitql/graphqlStores';
	import { DataSelect } from '@kahi-ui/framework';

	export let onEditClick = () => {};
	export let onFormSubmit;
	export let onImageUpload;
	export let npc = {};
	export let form;
	export let status = undefined;
	export let errors = [];
	export let creating = false;

	$: browser && KQL_AssociationNamesAndIds.query();
	$: browser && KQL_RaceNamesAndIds.query();

	$: ({
		name,
		description,
		markdownNotes,
		imageIds = [],
		race,
		associations: associationsConnection,
		lockUser,
		lockedBySelf
	} = npc || {});

	$: editing = lockedBySelf || creating;
	$: associations = associationsConnection?.edges.map(({ node }) => node);
	$: associationsForSelect =
		$KQL_AssociationNamesAndIds.status === 'DONE' &&
		$KQL_AssociationNamesAndIds.data.associations.edges.map(({ node: { name, id } }) => ({
			text: name,
			id
		}));
	$: racesForSelect =
		$KQL_RaceNamesAndIds.status === 'DONE' &&
		$KQL_RaceNamesAndIds.data.races.edges.map(({ node: { name, id } }) => ({
			text: name,
			id
		}));
</script>

<StatusHandler {status} {errors} value={npc} entityName="npc">
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
				{#if $KQL_AssociationNamesAndIds.status !== 'DONE'}
					Loading Items...
				{:else}
					<div class="spacer" />
					Items loaded
					<DataSelect
						class="_detailbase-input"
						items={associationsForSelect}
						multiple
						placeholder="Select related associations"
						logic_name="dataselect-logic-state"
						bind:logic_state={$form.associations}
					/>
				{/if}
			{:else}
				<div class="items-container">
					<div>Associations</div>
					{#each associations as association}
						<div>
							<!-- <AssociationListDisplay {association} /> -->
							{association.name}
						</div>
					{/each}
				</div>
			{/if}
			<Spacer lg />
			{#if editing}
				{#if $KQL_RaceNamesAndIds.status !== 'DONE'}
					Loading Items...
				{:else}
					<div class="spacer" />
					Items loaded
					<DataSelect
						class="_detailbase-input"
						items={racesForSelect}
						placeholder="Select related associations"
						logic_name="dataselect-logic-state"
						bind:logic_state={$form.race}
					/>
				{/if}
			{:else}
				<div class="items-container">
					<div>Race</div>
					<div>
						<!-- <RaceListDisplay {race} /> -->
						{race.name}
					</div>
				</div>
			{/if}
		</svelte:fragment>
	</Layout>
</StatusHandler>
