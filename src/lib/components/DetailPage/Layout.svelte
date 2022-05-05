<script lang="ts">
	import CloudinaryUpload from '$lib/components/CloudinaryUpload.svelte';
	import { BasicProperty } from '$lib/components/DetailPage';
	import EditableMarkdown from '$lib/components/EditableMarkdown.svelte';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import LargeImage from '$lib/components/LargeImage.svelte';
	import { Container, Heading } from '@kahi-ui/framework';
	import { onMount } from 'svelte';

	export let name = 'No name or header slot provided';
	export let properties: { [key: string]: string | number } = {};
	export let imageIds;
	export let onEditClick;
	export let onFormSubmit;
	export let lockUser;
	export let lockedBySelf;
	export let onImageUpload;
	export let markdownNotes;

	let isMounted = false;
	onMount(() => {
		isMounted = true;
	});

	$: editing = lockedBySelf;
	console.log({ imageIds });
</script>

<div class="spacer" />
<Container>
	<form on:submit|preventDefault={onFormSubmit}>
		<!-- TOP ROW -->
		<div class="top-row">
			<!-- NAME -->
			<Heading is="h1">
				{#if editing}
					<input name="name" value={name} required />
				{:else}
					{name}
				{/if}
			</Heading>

			<!-- EDIT / SAVE + LOCKED BY {USER} -->
			<span>
				{#if isMounted}
					{#if lockedBySelf}
						Locked by {lockUser.username} <button type="submit">Save</button>
					{:else if lockUser}
						Locked by {lockUser.username} <button type="button" disabled>Edit</button>
					{:else}
						<button type="button" on:click={onEditClick}>Edit</button>
					{/if}
				{/if}
			</span>
		</div>

		<!-- HR -->
		<div class="spacer-xs" />
		<hr />
		<div class="spacer" />

		<!-- IMAGES -->
		<div class="img-container">
			<slot name="mainImage">
				{#if imageIds?.length}
					<CloudinaryUpload {onImageUpload}>
						<ImageCarousel {imageIds} />
					</CloudinaryUpload>
				{:else}
					<CloudinaryUpload {onImageUpload}>
						<LargeImage imageId={'dnd/sfaedxiltuowlw7whb0c'} alt={name} />
					</CloudinaryUpload>
				{/if}
			</slot>
		</div>

		<!-- MARKDOWN NOTES -->
		<div class="markdown-container">
			<slot name="markdown-notes">
				<EditableMarkdown bind:value={markdownNotes} {editing} asInput slot="markdown-notes" />
			</slot>
		</div>

		<!-- PROPERTIES -->
		<slot name="properties">
			{#each Object.entries(properties) as [name, value]}
				<BasicProperty {name} {value} />
			{/each}
		</slot>
	</form>
</Container>

<style>
	.top-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	hr {
		color: #ccc;
	}
	.spacer {
		height: 2em;
	}
	.spacer-xs {
		height: 0.5em;
	}
	.img-container {
		float: right;
		width: clamp(40%, (120px - 40%) * 1000, 100%);
		margin-left: 0.5em;
		/* margin-bottom: 0.5em; */
	}
	.markdown-container {
		width: clamp(56%, (120px - 40%) * 1000, 100%);
	}
</style>
