<script>
	import cloudinary from '$lib/cloudinary';
	import { defaultImage } from '@cloudinary/url-gen/actions/delivery';
	import { thumbnail } from '@cloudinary/url-gen/actions/resize';
	import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
	import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';
	import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';

	export let thumbnailId = 'dnd:placeholder.jpg';
	export let width = 75;
	export let height = 75;
	export let radius = 0;

	let src;
	// Must use `:` rather than `/` as separator for defaultImageSrc
	let defaultImageSrc = 'dnd:placeholder.jpg';

	const image = cloudinary.image(thumbnailId);
	image
		.resize(thumbnail().width(width).height(height).gravity(focusOn(FocusOn.face())))
		.roundCorners(byRadius(radius))
		.delivery(defaultImage(defaultImageSrc));
	src = image.toURL();
</script>

{#if src}
	<img {src} alt="" />
{/if}
