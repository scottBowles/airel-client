<script>
	import { getThumbnailUrl } from '$lib/cloudinary';

	export let thumbnailId = 'dnd:placeholder.jpg';
	export let width = 75;
	export let height = 75;
	export let radius = 0;

	let src;
	// Must use `:` rather than `/` as separator for defaultImageSrc
	let defaultSrc = 'dnd:placeholder.jpg';

	src = getThumbnailUrl(thumbnailId, {
		width,
		height,
		radius,
		defaultSrc
	});
</script>

{#if src}
	<img {src} alt="" />
{/if}
