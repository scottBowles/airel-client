<script>
	/** Cloudinary actions */
	import { thumbnail } from '@cloudinary/url-gen/actions/resize';
	import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
	/** Cloudinary qualifiers */
	import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
	import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';

	/** Cloudinary instance store */
	import cloudinary from '$lib/stores/cloudinary';

	export let imageId = 'dnd/sfaedxiltuowlw7whb0c';
	export let width = 100;
	export let height = 100;
	export let radius = 100;

	let src;

	const image = $cloudinary.image(imageId);
	image
		.resize(thumbnail().width(width).height(height).gravity(focusOn(FocusOn.face())))
		.roundCorners(byRadius(radius));
	src = image.toURL();
</script>

{#if src}
	<img {src} alt="" />
{/if}
