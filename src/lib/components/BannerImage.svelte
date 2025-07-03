<script lang="ts">
	import { onMount } from 'svelte';

	/** Cloudinary actions */
	import { fill } from '@cloudinary/url-gen/actions/resize';
	/** Cloudinary qualifiers */
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';

	/** Cloudinary instance store */
	import cloudinary from '$lib/cloudinary';
	import { opacity } from '@cloudinary/url-gen/actions/adjust';
	import { source } from '@cloudinary/url-gen/actions/overlay';
	import { text } from '@cloudinary/url-gen/qualifiers/source';
	import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';
	import { Position } from '@cloudinary/url-gen/qualifiers';

	interface Props {
		imageId?: string;
		width?: number;
		height?: number;
		overlay?: string;
		alt?: string;
		gravity?: ReturnType<typeof compass> | undefined;
	}

	let {
		imageId = 'dnd/City_guard_and_magister-5e_uk2sr0',
		width = 2400,
		height = 300,
		overlay = '',
		alt = '',
		gravity = undefined
	}: Props = $props();

	let src: string = $state('');
	let loaded: boolean = $state(false);
	let imgElement: HTMLImageElement | undefined = $state();

	let heightToWeightRatio = $derived(height / width);

	onMount(() => {
		if (imgElement) {
			imgElement.onload = () => {
				loaded = true;
			};
		}
	});

	const image = cloudinary.image(imageId);
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

<img
	{src}
	{alt}
	bind:this={imgElement}
	class:loaded
	style={`--height-to-weight-ratio:${heightToWeightRatio}`}
/>

<style>
	img {
		opacity: 1;
		/**
		 * We set height explicitly here so content below the banner gets
		 * pushed down while banner is loading
		 */
		height: calc(100vw * var(--height-to-weight-ratio));
	}
	img.loaded {
		opacity: 1;
	}
</style>
