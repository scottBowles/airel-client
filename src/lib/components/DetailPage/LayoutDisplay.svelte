<script lang="ts">
	import CloudinaryUpload from '$lib/components/CloudinaryUpload.svelte';
	import { BasicProperty } from '$lib/components/DetailPage';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import Spacer from '../Spacer.svelte';
	import LayoutBase from './LayoutBase.svelte';
	import LogsDisplay from './LogsDisplay.svelte';

	export let id: string;
	export let name: string | null;
	export let description: string | null = '';
	export let properties: { [key: string]: string | number } = {};
	export let imageIds: string[] | null = [];
	export let logs: any = undefined;
	export let onEditClick: () => void;
	export let lockUser: any = undefined;
	export let onImageUpload = () => {};
	export let markdownNotes: string | null = '';
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
		<LogsDisplay {logs} {id} />
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
