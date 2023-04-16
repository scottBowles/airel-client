<script lang="ts">
	import { AddEntityLogStore, RemoveEntityLogStore, EntityAddImageStore } from '$houdini';
	import CloudinaryUpload from '$lib/components/CloudinaryUpload.svelte';
	import { BasicProperty } from '$lib/components/DetailPage';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import { somethingWentWrong } from '$lib/utils';
	import Spacer from '../Spacer.svelte';
	import LayoutBase from './LayoutBase.svelte';
	import LogsDisplay from './LogsDisplay.svelte';

	const addLogMutation = new AddEntityLogStore();
	const removeLogMutation = new RemoveEntityLogStore();
	const addImageMutation = new EntityAddImageStore();

	export let id: string;
	export let name: string | null = '';
	export let description: string | null = '';
	export let markdownNotes: string | null = '';
	export let properties: { [key: string]: string | number } = {};
	export let imageIds: string[] | null = [];
	export let logs: any = undefined;
	export let lockUser: any = undefined;
	export let onEditClick: () => void;

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
			Locked by {lockUser.username} <button type="button" disabled>Edit</button>
		{:else}
			<button class="ml-auto" type="button" on:click={onEditClick}>Edit</button>
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
	<p slot="description" class="italic">{description}</p>

	<!-- PROPERTIES -->
	<svelte:fragment slot="properties">
		{#each Object.entries(properties) as [name, value]}
			<BasicProperty {name} {value} />
		{/each}
	</svelte:fragment>

	<!-- MARKDOWN NOTES -->
	<div slot="markdownNotes" class="prose inline">
		{@html markdownNotes}
	</div>
</LayoutBase>
