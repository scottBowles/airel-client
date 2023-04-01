<script lang="ts">
	import { browser } from '$app/environment';
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import MultiSelect from '$lib/components/MultiSelect.svelte';
	import Spacer from '$lib/components/Spacer.svelte';

	type Association = {
		id: string;
		name: string | null;
		description: string | null;
		markdownNotes: string | null;
		logs: {
			readonly edges: {
				readonly node: { readonly id: string; readonly url: string; readonly name: string | null };
			}[];
		};
		imageIds: string[];
		lockUser: { readonly id: string; readonly username: string } | null;
		// lockedBySelf: boolean;
		npcs: {
			edges: {
				node: {
					id: string;
					name: string;
				};
			}[];
		};
	};

	export let onEditClick = () => {};
	// export let onFormSubmit;
	// export let onImageUpload;
	export let association: Association | null;
	// export let form;
	// export let status = undefined;
	// export let errors = [];
	export let creating = false;
	// export let patchStore = undefined;

	$: ({
		id,
		name,
		description,
		markdownNotes,
		logs,
		imageIds = [],
		lockUser,
		// lockedBySelf,
		npcs: npcsConnection
	} = association || ({} as Association));
	let lockedBySelf = false;

	$: editing = lockedBySelf || creating;
	$: npcs = npcsConnection?.edges.map(({ node }) => node) || [];
	// $: npcsForSelect =
	// 	$KQL_NpcNamesAndIds.status === 'DONE'
	// 		? $KQL_NpcNamesAndIds.data.npcs.edges.map(({ node }) => ({
	// 				label: node.name,
	// 				value: node.id
	// 		  }))
	// 		: [];
	$: npcIds = npcs.map((npc) => npc.id);
	$: memberSelectId = `association-${id}-member-select`;
</script>

<StatusHandler {creating} status="DONE" errors={''} value={association} entityName="association">
	<!-- <Layout
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
	> -->
	<Layout
		{id}
		{name}
		{description}
		{markdownNotes}
		{logs}
		{imageIds}
		{lockUser}
		{lockedBySelf}
		{onEditClick}
		{creating}
	>
		<svelte:fragment slot="properties">
			<Spacer lg />
			{#if editing}
				<div class="form-control w-full max-w-xs">
					EDITING NOT IMPLEMENTED
					<!-- <label class="label" for={memberSelectId}>
						<span class="label-text">Select Members</span>
					</label>
					{#if $KQL_NpcNamesAndIds.status !== 'DONE'}
						Loading Characters...
					{:else}
						<MultiSelect
							id={memberSelectId}
							options={npcsForSelect}
							initialValues={npcIds}
							bind:values={$form.npcs}
						/>
					{/if} -->
				</div>
			{:else}
				<div class="items-container">
					<h2 class="text-xl font-bold">Members</h2>
					<Spacer xs />
					{#if npcs?.length > 0}
						<div>
							{#each npcs as npc, i}
								<a href={`/characters/${npc.id}`} class="link link-accent link-hover">{npc.name}</a
								>{i < npcs.length - 1 ? ', ' : ''}
							{/each}
						</div>
					{:else}
						<p class="text-slate-400">- None selected -</p>
					{/if}
				</div>
			{/if}
			<Spacer lg />
		</svelte:fragment>
	</Layout>
</StatusHandler>
