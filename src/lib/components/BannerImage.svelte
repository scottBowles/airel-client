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

	// THE BELOW SHOULD ALLOW USE OF PLUGINS (COPY PASTED FROM
	// https://cloudinary.com/documentation/javascript_image_transformations#code_explorer_javascript_plugins).
	// IT IS NOT YET IMPLEMENTED THOUGH.
	//
	// // Import all the plugins
	// import {lazyload, responsive, accessibility, placeholder, HtmlImageLayer} from "@cloudinary/html";
	// import {CloudinaryImage} from "@cloudinary/url-gen";

	// // Create a new HTML image element and inject it to the page
	// const imgTag = document.createElement('img');
	// document.body.appendChild(imgTag);

	// // Create your image
	// const myImage = new CloudinaryImage('docs/colored_pencils', {cloudName: 'demo'});

	// // Wire up Cloudinary to work with that element and use the responsive and accessibility plugins
	// // new HtmlImageLayer(imgTag, myImage, [responsive(), accessibility()]);
	// new HtmlImageLayer(imgTag, myImage, [lazyload(), responsive(), accessibility(), placeholder()]);

	export let imageId = 'dnd/City_guard_and_magister-5e_uk2sr0';
	export let width = 1600;
	export let height = 200;
	export let radius = 0;
	export let overlay = '';

	let src;

	const image = $cloudinary.image(imageId);
	image
		.format('auto')
		.quality('auto')
		.resize(fill().width(width).height(height).gravity(compass('north_east')))
		.roundCorners(byRadius(radius))
		.adjust(opacity(65));
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

{#if src}
	<img {src} alt="" />
{/if}
