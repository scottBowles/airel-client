<svelte:options runes={true} />

<script lang="ts">
	import { getThumbnailUrl } from '$lib/cloudinary';

	// Must use `:` rather than `/` as separator for defaultImageSrc
	let DEFAULT_ID = 'dnd:placeholder.jpg';

	let { thumbnailId = DEFAULT_ID, width = 75, height = 75, radius = 0 } = $props();

	let src = $derived(
		getThumbnailUrl(thumbnailId ?? DEFAULT_ID, {
			width,
			height,
			radius,
			defaultSrc: DEFAULT_ID
		})
	);
</script>

{#if src}
	<img {src} alt="" />
{/if}
