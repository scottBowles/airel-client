<script lang="ts">
	import { page } from '$app/state';
	import {
		AddEntityLogStore,
		EntityAddImageStore,
		fragment,
		graphql,
		LockStore,
		RemoveEntityLogStore,
		type EntityDetailFields
	} from '$houdini';
	import CloudinaryUpload from '$lib/components/CloudinaryUpload.svelte';
	import { BasicProperty } from '$lib/components/DetailPage';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import { somethingWentWrong } from '$lib/utils';
	import { prop } from 'ramda';
	import type { Snippet } from 'svelte';
	import FaEdit from 'svelte-icons/fa/FaEdit.svelte';
	import Spacer from '../Spacer.svelte';
	import LayoutBase from './LayoutBase.svelte';
	import LogsDisplay from './LogsDisplay.svelte';

	const lockForEditMutation = new LockStore();
	const addLogMutation = new AddEntityLogStore();
	const removeLogMutation = new RemoveEntityLogStore();
	const addImageMutation = new EntityAddImageStore();

	interface Props {
		properties?: { [key: string]: string | number };
		entity: EntityDetailFields;
		propertiesSnippet?: Snippet;
		relatedSnippet?: Snippet;
	}

	let { properties = {}, entity, propertiesSnippet, relatedSnippet }: Props = $props();

	let { me } = $derived(page.data);
	let data = $derived(
		fragment(
			entity,
			graphql(`
				fragment EntityDetailFields on Entity {
					id
					name
					description
					imageIds
					markdownNotes
					lockUser {
						id
						username
					}
					logs {
						edges {
							node {
								id
								url
								title
							}
						}
					}
					relatedArtifacts {
						edges {
							node {
								id
								name
							}
						}
					}
					relatedAssociations {
						edges {
							node {
								id
								name
							}
						}
					}
					relatedCharacters {
						edges {
							node {
								id
								name
							}
						}
					}
					relatedItems {
						edges {
							node {
								id
								name
							}
						}
					}
					relatedPlaces {
						edges {
							node {
								id
								name
							}
						}
					}
					relatedRaces {
						edges {
							node {
								id
								name
							}
						}
					}
				}
			`)
		)
	);

	const withUrl = (entity: string) => (node: { id: string; name: string }) => ({
		...node,
		url: `/${entity}/${node.id}`
	});

	let { id, name, description, imageIds = [], markdownNotes, logs, lockUser } = $derived($data);

	let relatedArtifacts = $derived(
		$data.relatedArtifacts?.edges.map(prop('node')).map(withUrl('artifacts')) || []
	);
	let relatedAssociations = $derived(
		$data.relatedAssociations?.edges.map(prop('node')).map(withUrl('associations')) || []
	);
	let relatedCharacters = $derived(
		$data.relatedCharacters?.edges.map(prop('node')).map(withUrl('characters')) || []
	);
	let relatedItems = $derived(
		$data.relatedItems?.edges.map(prop('node')).map(withUrl('items')) || []
	);
	let relatedPlaces = $derived(
		$data.relatedPlaces?.edges.map(prop('node')).map(withUrl('places')) || []
	);
	let relatedRaces = $derived(
		$data.relatedRaces?.edges.map(prop('node')).map(withUrl('races')) || []
	);
	let allRelated = $derived([
		...relatedArtifacts,
		...relatedAssociations,
		...relatedCharacters,
		...relatedItems,
		...relatedPlaces,
		...relatedRaces
	]);

	const onEditClick = () => lockForEditMutation.mutate({ id });

	const onLogAdd = async (logUrl: string) => {
		const res = await addLogMutation.mutate({ entityId: id, logUrl });
		if (res.errors) somethingWentWrong(res.errors[0].message);
	};

	const onLogRemove = async (logId: string) => {
		const res = await removeLogMutation.mutate({ entityId: id, logId });
		if (res.errors) somethingWentWrong(res.errors[0].message);
	};

	const onImageUpload = async (error: any, result: any) => {
		if (error) return somethingWentWrong(error.message);

		const isImageUploadedEvent = result?.event === 'success';
		if (!isImageUploadedEvent) return;

		const imageId = result.info.public_id;
		const res = await addImageMutation.mutate({ id, imageId });
		if (res.errors) somethingWentWrong(res.errors[0].message);
	};

	const propertiesSnippet_render = $derived(propertiesSnippet);
	const relatedSnippet_render = $derived(relatedSnippet);
</script>

<LayoutBase>
	<!-- NAME -->
	{#snippet nameSnippet()}
		<h1 class="text-3xl font-bold">{name}</h1>
	{/snippet}

	<!-- EDIT / SAVE + LOCKED BY {USER} -->
	{#snippet lockedBySnippet()}
		{#if me?.isStaff}
			{#if lockUser}
				Locked by {lockUser.username}
				<div class="tooltip ml-auto" data-tip="Edit">
					<button type="button" class="btn btn-ghost btn-sm icon-btn" disabled>
						<span class="icon"><FaEdit /></span>
					</button>
				</div>
			{:else}
				<div class="tooltip ml-auto" data-tip="Edit">
					<button type="button" class="btn btn-ghost btn-sm icon-btn" onclick={onEditClick}>
						<span class="icon"><FaEdit /></span>
					</button>
				</div>
			{/if}
		{/if}
	{/snippet}

	<!-- MAIN IMAGE -->
	{#snippet mainImageSnippet()}
		<div class="mx-auto w-full max-w-xs">
			{#if me?.isStaff}
				<CloudinaryUpload {onImageUpload}>
					<ImageCarousel imageIds={imageIds ?? []} alt={name ?? ''} />
				</CloudinaryUpload>
			{:else}
				<ImageCarousel imageIds={imageIds ?? []} alt={name ?? ''} />
			{/if}

			<Spacer />
		</div>
	{/snippet}

	<!-- LOGS -->
	{#snippet logsSnippet()}
		<LogsDisplay {logs} {onLogAdd} {onLogRemove} />
		<Spacer />
	{/snippet}

	<!-- DESCRIPTION -->
	{#snippet descriptionSnippet()}
		<p class="italic">{description ?? ''}</p>
	{/snippet}

	<!-- PROPERTIES -->
	{#snippet propertiesSnippet()}
		{#if propertiesSnippet_render}{@render propertiesSnippet_render()}{:else}
			{#each Object.entries(properties) as [name, value] (value)}
				<BasicProperty {name} {value} />
			{/each}
		{/if}
	{/snippet}

	<!-- RELATED -->
	{#snippet relatedSnippet()}
		{#if relatedSnippet_render}{@render relatedSnippet_render()}{:else if allRelated.length > 0}
			<h2 class="text-xl font-bold">Associated With</h2>
			{#each allRelated as { id, name, url } (id)}
				<div class="badge badge-accent badge-outline">
					<a href={url} class="link-hover">{name}</a>
				</div>
			{/each}
		{/if}
	{/snippet}

	<!-- MARKDOWN NOTES -->
	{#snippet markdownNotesSnippet()}
		<div class="prose inline">
			{@html markdownNotes ?? ''}
		</div>
	{/snippet}
</LayoutBase>

<style>
	.icon {
		display: inline-block;
		height: 16px;
		width: 16px;
	}

	.icon-btn:hover {
		color: #908149;
	}

	.tooltip {
		text-transform: none;
	}
</style>
