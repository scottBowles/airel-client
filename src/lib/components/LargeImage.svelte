<script>
	/** Cloudinary actions */
	import { thumbnail } from '@cloudinary/url-gen/actions/resize';
	import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';

	/** Cloudinary instance store */
	import cloudinary from '$lib/cloudinary';
	import { defaultImage } from '@cloudinary/url-gen/actions/delivery';

	export let imageId;
	export let width = 400;
	export let radius = 0;
	export let alt = '';

	let src;
	// Must use `:` rather than `/` as separator for defaultImageSrc
	let defaultImageSrc = 'dnd:sfaedxiltuowlw7whb0c';

	const image = cloudinary.image(imageId).delivery(defaultImage(defaultImageSrc));
	image.resize(thumbnail().width(width)).roundCorners(byRadius(radius));
	src = image.toURL();
</script>

{#if src}
	<img {src} {alt} />
{/if}
