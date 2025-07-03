<svelte:options runes={true} />

<script lang="ts">
	import cloudinary from '$lib/cloudinary';
	import { DEFAULT_IMAGE_SRC } from '$lib/constants';
	import { defaultImage } from '@cloudinary/url-gen/actions/delivery';
	import { thumbnail } from '@cloudinary/url-gen/actions/resize';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';

	let { imageIds: initImageIds, alt }: { imageIds: string[]; alt: string } = $props();

	let imageIds = $derived(
		initImageIds.length > 0 ? [...new Set(initImageIds)] : [DEFAULT_IMAGE_SRC]
	);

	function getImageSrc(imageId: string): string {
		const image = cloudinary
			.image(imageId)
			.resize(thumbnail().width(320))
			.delivery(defaultImage(DEFAULT_IMAGE_SRC));
		const src = image.toURL();
		return src;
	}

	function stopPropagation(event: Event) {
		event.stopPropagation();
	}
</script>

<Splide
	hasTrack={false}
	aria-label="My Favorite Images"
	options={{ type: 'fade', rewind: true, height: 400, lazyLoad: 'nearby', speed: 1000 }}
>
	<div
		class="splide__arrows"
		class:hidden={imageIds.length < 2}
		onclick={stopPropagation}
		onkeypress={stopPropagation}
		role="button"
		tabindex="0"
	></div>
	<SplideTrack>
		{#each imageIds as imageId (imageId)}
			{@const src = getImageSrc(imageId)}
			<SplideSlide>
				<img data-splide-lazy={src} {alt} />
			</SplideSlide>
		{/each}
	</SplideTrack>
</Splide>

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.hidden {
		display: none;
	}
</style>
