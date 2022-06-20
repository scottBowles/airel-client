<script lang="ts">
	import { browser } from '$app/env';
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import Spacer from '$lib/components/Spacer.svelte';
	import { KQL_NpcNamesAndIds } from '$lib/graphql/_kitql/graphqlStores';
	import { Anchor, DataSelect, Heading, Text } from '@kahi-ui/framework';

	export let onEditClick = () => {};
	export let onFormSubmit;
	export let onImageUpload;
	export let association = {};
	export let form;
	export let status = undefined;
	export let errors = [];
	export let creating = false;
	export let patchStore = undefined;

	$: browser && KQL_NpcNamesAndIds.query();

	$: ({
		id,
		name,
		description,
		markdownNotes,
		logs,
		imageIds = [],
		lockUser,
		lockedBySelf,
		npcs: npcsConnection
	} = association || {});

	$: editing = lockedBySelf || creating;
	$: npcs = npcsConnection?.edges.map(({ node }) => node) || [];
	$: npcsForSelect =
		$KQL_NpcNamesAndIds.status === 'DONE' &&
		$KQL_NpcNamesAndIds.data.npcs.edges.map(({ node: { name, id } }) => ({
			text: name,
			id
		}));
</script>

<StatusHandler
	status={creating ? 'DONE' : status}
	{errors}
	value={association}
	entityName="association"
>
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
				{#if $KQL_NpcNamesAndIds.status !== 'DONE'}
					Loading Characters...
				{:else}
					<div class="spacer" />
					<DataSelect
						class="_detailbase-input"
						items={npcsForSelect}
						multiple
						placeholder="Select members"
						logic_name="dataselect-logic-state"
						bind:logic_state={$form.npcs}
					/>
				{/if}
			{:else}
				<div class="items-container">
					<Heading is="h4">Members</Heading>
					<Spacer xs />
					{#if npcs?.length > 0}
						<div>
							{#each npcs as npc, i}
								<Anchor sveltekit:prefetch href={`/characters/${npc.id}`}>{npc.name}</Anchor>{i <
								npcs.length - 1
									? ', '
									: ''}
							{/each}
						</div>
					{:else}
						<Text palette="neutral">- None selected -</Text>
					{/if}
				</div>
			{/if}
			<Spacer lg />
		</svelte:fragment>
	</Layout>
</StatusHandler>
