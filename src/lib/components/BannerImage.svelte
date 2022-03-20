<script>
	/** Cloudinary actions */
	import { thumbnail, fill } from '@cloudinary/url-gen/actions/resize';
	import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
	/** Cloudinary qualifiers */
	import { compass, focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
	import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';

	/** Cloudinary instance store */
	import cloudinary from '$lib/stores/cloudinary';
	import { artisticFilter, colorize } from '@cloudinary/url-gen/actions/effect';
	import { opacity } from '@cloudinary/url-gen/actions/adjust';
	import { source } from '@cloudinary/url-gen/actions/overlay';
	import { text } from '@cloudinary/url-gen/qualifiers/source';
	import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';
	import { Position } from '@cloudinary/url-gen/qualifiers';
	import Transformation from '@cloudinary/url-gen/backwards/transformation';

	export let imageId = 'dnd/City_guard_and_magister-5e_uk2sr0';
	export let width = 1600;
	export let height = 200;
	export let overlay = '';
	export let alt = '';
	export let gravity = undefined;

	let src;

	const image = $cloudinary.image(imageId);
	let resize = fill().width(width).height(height);
	if (gravity) {
		resize = resize.gravity(gravity);
	}

	image.format('auto').quality('auto').resize(resize).adjust(opacity(65));
	// .effect(artisticFilter('frost'))
	// .effect(colorize().level(40).color('#ffffff'));

	if (overlay) {
		image.overlay(
			source(
				text(
					overlay,
					new TextStyle('Arial', height / 2).fontWeight('bold').fontStyle('italic')
				).textColor('#fff')
			).position(new Position().gravity(compass('south_west')).offsetX(5))
		);
		// image.overlay(source(text("Flower", new TextStyle("Arial", 200))).position(new Position().gravity(compass("south"))
	}

	src = image.toURL();
</script>

<img {src} {alt} />
