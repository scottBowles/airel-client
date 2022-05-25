<script lang="ts">
	import CloudinaryUpload from '$lib/components/CloudinaryUpload.svelte';
	import { BasicProperty } from '$lib/components/DetailPage';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import MobileNavSpacer from '$lib/components/MobileNav/Spacer.svelte';
	import { Container, Heading, Text, TextInput } from '@kahi-ui/framework';
	import { onMount } from 'svelte';
	import MdEditor from '../EditableMarkdown/MdEditor.svelte';
	import MdViewer from '../EditableMarkdown/MdViewer.svelte';

	export let form;
	export let name = '';
	export let description = '';
	export let properties: { [key: string]: string | number } = {};
	export let imageIds = [];
	export let onEditClick = () => {};
	export let onFormSubmit = () => {};
	export let lockUser;
	export let lockedBySelf = false;
	export let creating = false;
	export let onImageUpload = () => {};
	export let markdownNotes = '';

	let isMounted = false;
	onMount(() => {
		isMounted = true;
	});

	$: editing = lockedBySelf || creating;
	console.log({ imageIds });
	console.log({ lockedBySelf });
</script>

<MobileNavSpacer />
<div class="spacer-xs" />
<Container>
	<form on:submit|preventDefault={onFormSubmit}>
		<!-- TOP ROW -->
		<div class="top-row">
			<span class="name-container">
				<!-- NAME -->
				{#if editing}
					<TextInput
						span_x={'30'}
						variation="block"
						name="name"
						placeholder="Name"
						bind:value={$form.name}
						required
					/>
				{:else}
					<Heading is="h1">{name}</Heading>
				{/if}
			</span>

			<!-- EDIT / SAVE + LOCKED BY {USER} -->
			<span class="locked-edit-save-container">
				{#if isMounted}
					{#if creating}
						<button class="lone-btn" type="submit">Save</button>
					{:else if lockedBySelf}
						<span>Locked by {lockUser.username}</span> <button type="submit">Save</button>
					{:else if lockUser}
						Locked by {lockUser.username} <button type="button" disabled>Edit</button>
					{:else}
						<button class="lone-btn" type="button" on:click={onEditClick}>Edit</button>
					{/if}
				{/if}
			</span>
		</div>

		<!-- HR -->
		<div class="spacer-xs" />
		<hr />
		<div class="spacer" />

		<div class:clearfix={editing}>
			<!-- IMAGES -->
			<div class="img-container">
				<slot name="mainImage">
					<CloudinaryUpload {onImageUpload}>
						<ImageCarousel imageIds={editing ? $form.imageIds : imageIds} />
					</CloudinaryUpload>
				</slot>
			</div>

			<!-- DESCRIPTION -->
			{#if editing}
				<TextInput
					span_x={'30'}
					is="textarea"
					variation="block"
					name="description"
					placeholder="Brief Description"
					bind:value={$form.description}
				/>
			{:else}
				<Text class="description-text">{description}</Text>
			{/if}

			<!-- PROPERTIES -->
			<slot name="properties">
				{#each Object.entries(properties) as [name, value]}
					<BasicProperty {name} {value} />
				{/each}
			</slot>
		</div>

		<div class="spacer" />

		<!-- MARKDOWN NOTES -->
		<!-- <div class:markdown-container={false}> -->
		<slot name="markdown-notes">
			{#if editing}
				<MdEditor bind:value={$form.markdownNotes} asInput />
			{:else}
				<MdViewer value={markdownNotes} />
			{/if}
		</slot>
		<!-- </div> -->
	</form>
</Container>

<style>
	.clearfix::after {
		content: '';
		clear: both;
		display: table;
	}
	.top-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.name-container {
		flex-grow: 3;
	}
	.locked-edit-save-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex: 1;
		gap: 2rem;
		min-width: fit-content;
	}
	.lone-btn {
		margin-left: auto;
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
	/* .markdown-container {
		width: clamp(56%, (120px - 40%) * 1000, 100%);
	} */
	:global(.description-text) {
		font-style: italic;
	}
</style>
