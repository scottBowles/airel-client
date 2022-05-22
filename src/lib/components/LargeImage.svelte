<script>
	/** Cloudinary actions */
	/** Cloudinary instance store */
	import cloudinary from '$lib/cloudinary';
	import { defaultImage } from '@cloudinary/url-gen/actions/delivery';
	import { thumbnail } from '@cloudinary/url-gen/actions/resize';
	import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';

	export let imageId = 'dnd:placeholder.jpg';
	export let width = 400;
	export let radius = 0;
	export let alt = '';

	let image;
	let src;
	// Must use `:` rather than `/` as separator for defaultImageSrc
	let defaultImageSrc = 'dnd:placeholder.jpg';

	$: {
		image = cloudinary.image(imageId);
		image
			.resize(thumbnail().width(width))
			.roundCorners(byRadius(radius))
			.delivery(defaultImage(defaultImageSrc));
		src = image.toURL();
	}
</script>

{#if src}
	<img {src} {alt} />
{/if}
