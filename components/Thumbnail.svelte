<script lang="ts">
	import { getThumbnailUrl } from '$lib/cloudinary';

	const DEFAULT_ID = 'dnd:placeholder.jpg';

	export let thumbnailId: string | null | undefined;
	export let width = 75;
	export let height = 75;
	export let radius = 0;

	let src: string;
	// Must use `:` rather than `/` as separator for defaultImageSrc
	let defaultSrc = 'dnd:placeholder.jpg';

	src = getThumbnailUrl(thumbnailId ?? DEFAULT_ID, {
		width,
		height,
		radius,
		defaultSrc
	});
</script>

{#if src}
	<img {src} alt="" />
{/if}
