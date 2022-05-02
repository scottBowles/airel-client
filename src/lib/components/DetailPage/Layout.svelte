<script lang="ts">
	import { Container, Heading } from '@kahi-ui/framework';

	import CloudinaryUpload from '$lib/components/CloudinaryUpload.svelte';
	import { BasicProperty } from '$lib/components/DetailPage';
	import LargeImage from '$lib/components/LargeImage.svelte';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';

	export let name = 'No name or header slot provided';
	export let properties = {};
	export let imageIds;
	export let onEditClick;
	export let onSaveClick;
	export let lockUser;
	export let lockedBySelf;
	export let handleImageUpload;

	$: editing = lockedBySelf;
	console.log({ imageIds });
</script>

<div class="spacer" />
<Container>
	<form on:submit|preventDefault={onSaveClick}>
		<div class="top-row">
			<Heading is="h1">
				{#if editing}
					<input name="name" value={name} required />
				{:else}
					{name}
				{/if}
			</Heading>
			<span>
				{lockUser?.username ? `Locked by ${lockUser.username}` : ''}
				{#if editing}
					<input type="submit" value="Save" />
				{:else}
					<button type="button" on:click={onEditClick}>Edit</button>
				{/if}
			</span>
		</div>
		<div class="spacer-xs" />
		<hr />
		<div class="spacer" />
		<div class="img-container">
			<slot name="mainImage">
				{#if imageIds?.length}
					<CloudinaryUpload {handleImageUpload}>
						<ImageCarousel {imageIds} />
					</CloudinaryUpload>
				{:else}
					<CloudinaryUpload {handleImageUpload}>
						<LargeImage imageId={'dnd/sfaedxiltuowlw7whb0c'} alt={name} />
					</CloudinaryUpload>
				{/if}
			</slot>
		</div>
		<div class="markdown-container">
			<slot name="markdown-notes" />
		</div>
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
