<script lang="ts">
	import CloudinaryUpload from '$lib/components/CloudinaryUpload.svelte';
	import { BasicProperty } from '$lib/components/DetailPage';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import { onMount } from 'svelte';
	import QuillEditor from '../QuillEditor.svelte';
	import Spacer from '../Spacer.svelte';
	import LogsDisplay from './LogsDisplay.svelte';

	export let id;
	export let form = undefined;
	export let name = '';
	export let description = '';
	export let properties: { [key: string]: string | number } = {};
	export let imageIds = [];
	export let logs = undefined;
	export let onEditClick = () => {};
	export let onFormSubmit = () => {};
	export let lockUser = undefined;
	export let lockedBySelf = false;
	export let creating = false;
	export let onImageUpload = () => {};
	export let markdownNotes = '';
	export let patchStore: ((patch: Record<string, any>) => void) | undefined = undefined;

	let isMounted = false;
	onMount(() => {
		isMounted = true;
	});

	$: editing = lockedBySelf || creating;
</script>

<div class="container mx-auto mt-2">
	<form on:submit|preventDefault={onFormSubmit}>
		<!-- TOP ROW -->
		<div class="top-row">
			<span class="name-container">
				<!-- NAME -->
				{#if editing}
					<div class="form-control">
						<label for="name-input" class="label">
							<span class="label-text">Name</span>
						</label>
						<input
							type="text"
							id="name-input"
							name="name"
							bind:value={$form.name}
							class="input input-bordered w-full max-w-xs"
							required
						/>
					</div>
				{:else}
					<h1 class="text-3xl font-bold">{name}</h1>
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
		<hr class="mt-2 mb-4" />

		<div class:clearfix={editing} class="max-w-full">
			<!-- FLOAT AREA -->
			<div class="float-right w-full sm:max-w-xs sm:w-2/5 ml-2">
				<!-- IMAGES -->
				<slot name="mainImage">
					<div class="w-full max-w-xs mx-auto">
						<CloudinaryUpload {onImageUpload}>
							<ImageCarousel imageIds={editing ? $form.imageIds : imageIds} alt={name} />
						</CloudinaryUpload>
						<Spacer />
					</div>
				</slot>
				<!-- LOGS -->
				{#if !creating}
					<slot name="logs">
						<LogsDisplay {logs} {id} {patchStore} />
						<Spacer />
					</slot>
				{/if}
			</div>

			<!-- DESCRIPTION -->
			{#if editing}
				<div class="form-control">
					<label for="description-input" class="label">
						<span class="label-text">Description</span>
					</label>
					<textarea
						name="description"
						id="description-input"
						bind:value={$form.description}
						class="textarea textarea-bordered w-full max-w-xs"
					/>
				</div>
			{:else}
				<p class="italic">{description}</p>
			{/if}

			<!-- PROPERTIES -->
			<slot name="properties">
				{#each Object.entries(properties) as [name, value]}
					<BasicProperty {name} {value} />
				{/each}
			</slot>
		</div>

		<Spacer />

		<!-- FREEFORM -->
		<slot name="freeform">
			<Spacer lg />
			{#if editing}
				<QuillEditor bind:html={$form.markdownNotes} />
			{:else}
				<div class="prose inline">
					{@html markdownNotes}
				</div>
			{/if}
		</slot>
	</form>
</div>

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
	:global(:root) {
		--detail-layout-input-width: clamp(56%, (370px - 100%) * 1000, 100%);
	}
	:global(.description-text) {
		font-style: italic;
	}
	:global(.detail-layout-input) {
		width: var(--detail-layout-input-width);
	}
</style>
