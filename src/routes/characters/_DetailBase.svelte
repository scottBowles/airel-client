<script lang="ts">
	import { browser } from '$app/env';
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import MultiSelect from '$lib/components/MultiSelect.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import {
		KQL_AssociationNamesAndIds,
		KQL_RaceNamesAndIds
	} from '$lib/graphql/_kitql/graphqlStores';

	export let onEditClick = () => {};
	export let onFormSubmit;
	export let onImageUpload;
	export let npc = {};
	export let form;
	export let status = undefined;
	export let errors = [];
	export let creating = false;
	export let patchStore = undefined;

	$: browser && KQL_AssociationNamesAndIds.query();
	$: browser && KQL_RaceNamesAndIds.query();

	$: ({
		id,
		name,
		description,
		markdownNotes,
		logs,
		imageIds = [],
		race,
		associations: associationsConnection,
		lockUser,
		lockedBySelf
	} = npc || {});

	$: editing = lockedBySelf || creating;
	$: associations = associationsConnection?.edges.map(({ node }) => node) || [];
	$: associationsForSelect =
		$KQL_AssociationNamesAndIds.status === 'DONE'
			? $KQL_AssociationNamesAndIds.data.associations.edges.map(({ node: { name, id } }) => ({
					label: name,
					value: id
			  }))
			: [];
	$: racesForSelect =
		$KQL_RaceNamesAndIds.status === 'DONE' &&
		$KQL_RaceNamesAndIds.data.races.edges.map(({ node: { name, id } }) => ({
			text: name,
			id
		}));
</script>

<StatusHandler {creating} {status} {errors} value={npc} entityName="character">
	<Layout
		{id}
		{form}
		{name}
		{description}
		{markdownNotes}
		{logs}
		{imageIds}
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
				{#if $KQL_RaceNamesAndIds.status !== 'DONE'}
					Loading Races...
				{:else}
					<div class="spacer" />
					<div class="form-control w-full max-w-xs">
						<label class="label" for={`character-${id}-race-select`}>
							<span class="label-text">Select Race</span>
						</label>
						<select
							bind:value={$form.race}
							class="select select-bordered"
							id={`character-${id}-race-select`}
						>
							<option disabled selected>Pick one</option>
							{#each racesForSelect as { id, text }}
								<option value={id}>{text}</option>
							{/each}
						</select>
					</div>
				{/if}
			{:else}
				<div class="items-container">
					<h2 class="text-xl font-bold">Race</h2>
					<Spacer xs />
					{#if race}
						<div>
							<a class="link link-accent link-hover" href={`/races/${race.id}`} sveltekit:prefetch>
								{race.name}
							</a>
						</div>
					{:else}
						<div>No race selected yet</div>
					{/if}
				</div>
			{/if}
			<Spacer lg />
			{#if editing}
				{#if $KQL_AssociationNamesAndIds.status !== 'DONE'}
					Loading Associations...
				{:else}
					<div class="spacer" />
					<div class="form-control w-full max-w-xs">
						<label class="label" for={`character-${id}-place-select`}>
							<span class="label-text">Select Associations</span>
						</label>
						<MultiSelect
							id={`character-${id}-place-select`}
							options={associationsForSelect}
							initialValues={associations.map((association) => association.id)}
							bind:values={$form.associations}
						/>
					</div>
				{/if}
			{:else if associations?.length > 0}
				<div class="items-container">
					<h2 class="text-xl font-bold">Associations</h2>
					<Spacer xs />
					<div>
						{#each associations as association, i}
							<a class="link link-accent link-hover" href={`/associations/${association.id}`}>
								{association.name}
							</a>
							{i < associations.length - 1 ? ', ' : ''}
						{/each}
					</div>
				</div>
			{/if}
			<Spacer lg />
		</svelte:fragment>
	</Layout>
</StatusHandler>
