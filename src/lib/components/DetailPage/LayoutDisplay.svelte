<script lang="ts">
	import { prop } from 'ramda';
	import FaEdit from 'svelte-icons/fa/FaEdit.svelte';
	import { page } from '$app/stores';
	import {
		fragment,
		graphql,
		AddEntityLogStore,
		RemoveEntityLogStore,
		EntityAddImageStore,
		LockStore,
		type EntityDetailFields
	} from '$houdini';
	import CloudinaryUpload from '$lib/components/CloudinaryUpload.svelte';
	import { BasicProperty } from '$lib/components/DetailPage';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import { idFromGlobalId, somethingWentWrong } from '$lib/utils';
	import Spacer from '../Spacer.svelte';
	import LayoutBase from './LayoutBase.svelte';
	import LogsDisplay from './LogsDisplay.svelte';

	const lockForEditMutation = new LockStore();
	const addLogMutation = new AddEntityLogStore();
	const removeLogMutation = new RemoveEntityLogStore();
	const addImageMutation = new EntityAddImageStore();

	export let properties: { [key: string]: string | number } = {};

	export let entity: EntityDetailFields;

	$: ({ me } = $page.data);
	$: data = fragment(
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
	);

	const withUrl = (entity: string) => (node: { id: string; name: string }) => ({
		...node,
		url: `/${entity}/${idFromGlobalId(node.id)}`
	});

	$: ({ id, name, description, imageIds = [], markdownNotes, logs, lockUser } = $data);

	$: relatedArtifacts =
		$data.relatedArtifacts?.edges.map(prop('node')).map(withUrl('artifacts')) || [];
	$: relatedAssociations =
		$data.relatedAssociations?.edges.map(prop('node')).map(withUrl('associations')) || [];
	$: relatedCharacters =
		$data.relatedCharacters?.edges.map(prop('node')).map(withUrl('characters')) || [];
	$: relatedItems = $data.relatedItems?.edges.map(prop('node')).map(withUrl('items')) || [];
	$: relatedPlaces = $data.relatedPlaces?.edges.map(prop('node')).map(withUrl('places')) || [];
	$: relatedRaces = $data.relatedRaces?.edges.map(prop('node')).map(withUrl('races')) || [];
	$: allRelated = [
		...relatedArtifacts,
		...relatedAssociations,
		...relatedCharacters,
		...relatedItems,
		...relatedPlaces,
		...relatedRaces
	];

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
</script>

<LayoutBase>
	<!-- NAME -->
	<h1 slot="name" class="text-3xl font-bold">{name}</h1>

	<!-- EDIT / SAVE + LOCKED BY {USER} -->
	<svelte:fragment slot="lockedBy">
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
					<button type="button" class="btn btn-ghost btn-sm icon-btn" on:click={onEditClick}>
						<span class="icon"><FaEdit /></span>
					</button>
				</div>
			{/if}
		{/if}
	</svelte:fragment>

	<!-- MAIN IMAGE -->
	<div slot="mainImage" class="w-full max-w-xs mx-auto">
		{#if me?.isStaff}
			<CloudinaryUpload {onImageUpload}>
				<ImageCarousel imageIds={imageIds ?? []} alt={name ?? ''} />
			</CloudinaryUpload>
		{:else}
			<ImageCarousel imageIds={imageIds ?? []} alt={name ?? ''} />
		{/if}

		<Spacer />
	</div>

	<!-- LOGS -->
	<svelte:fragment slot="logs">
		<LogsDisplay {logs} {onLogAdd} {onLogRemove} />
		<Spacer />
	</svelte:fragment>

	<!-- DESCRIPTION -->
	<p slot="description" class="italic">{description ?? ''}</p>

	<!-- PROPERTIES -->
	<slot name="properties" slot="properties">
		{#each Object.entries(properties) as [name, value]}
			<BasicProperty {name} {value} />
		{/each}
	</slot>

	<!-- RELATED -->
	<slot name="related" slot="related">
		{#if allRelated.length > 0}
			<h2 class="text-xl font-bold">Associated With</h2>
			{#each allRelated as { id, name, url } (id)}
				<div class="badge badge-accent badge-outline">
					<a href={url} class="link-hover">{name}</a>
				</div>
				{' '}
			{/each}
		{/if}
	</slot>

	<!-- MARKDOWN NOTES -->
	<div slot="markdownNotes" class="prose inline">
		{@html markdownNotes ?? ''}
	</div>
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
