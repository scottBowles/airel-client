<script>
	/** Cloudinary actions */
	import { thumbnail } from '@cloudinary/url-gen/actions/resize';
	import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';

	/** Cloudinary instance store */
	import cloudinary from '$lib/stores/cloudinary';

	export let imageId = 'dnd/sfaedxiltuowlw7whb0c';
	export let width = 400;
	export let height = 'auto';
	export let radius = 0;
	export let alt = '';

	let src;

	const image = $cloudinary.image(imageId);
	image.resize(thumbnail().width(width)).roundCorners(byRadius(radius));
	src = image.toURL();
</script>

{#if src}
	<img {src} {alt} />
{/if}
