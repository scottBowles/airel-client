<svelte:options runes={true} />

<script lang="ts">
	import { getThumbnailUrl } from '$lib/cloudinary';
	import { DEFAULT_IMAGE_SRC } from '$lib/constants';

	let {
		thumbnailId = DEFAULT_IMAGE_SRC,
		width = 75,
		height = 75,
		radius = 0
	}: {
		thumbnailId?: string;
		width?: number;
		height?: number;
		radius?: number;
	} = $props();

	let src = $derived(
		getThumbnailUrl(thumbnailId ?? DEFAULT_IMAGE_SRC, {
			width,
			height,
			radius,
			defaultSrc: DEFAULT_IMAGE_SRC
		})
	);
</script>

{#if src}
	<img {src} alt="" />
{/if}
