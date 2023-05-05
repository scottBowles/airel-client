<script lang="ts">
	import FaEdit from 'svelte-icons/fa/FaEdit.svelte';
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
	import { somethingWentWrong } from '$lib/utils';
	import Spacer from '../Spacer.svelte';
	import LayoutBase from './LayoutBase.svelte';
	import LogsDisplay from './LogsDisplay.svelte';

	const lockForEditMutation = new LockStore();
	const addLogMutation = new AddEntityLogStore();
	const removeLogMutation = new RemoveEntityLogStore();
	const addImageMutation = new EntityAddImageStore();

	export let properties: { [key: string]: string | number } = {};

	export let entity: EntityDetailFields;

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
							name
						}
					}
				}
			}
		`)
	);

	$: ({ id, name, description, imageIds = [], markdownNotes, logs, lockUser } = $data);

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
	</svelte:fragment>

	<!-- MAIN IMAGE -->
	<div slot="mainImage" class="w-full max-w-xs mx-auto">
		<CloudinaryUpload {onImageUpload}>
			<ImageCarousel imageIds={imageIds ?? []} alt={name ?? ''} />
		</CloudinaryUpload>
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
