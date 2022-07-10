<script lang="ts">
	import cloudinary from '$lib/cloudinary';
	import { defaultImage } from '@cloudinary/url-gen/actions/delivery';
	import { thumbnail } from '@cloudinary/url-gen/actions/resize';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';

	export let imageIds;
	export let alt;

	let defaultImageSrc = 'dnd:placeholder.jpg';

	function getImageSrc(imageId: string): string {
		const image = cloudinary
			.image(imageId)
			.resize(thumbnail().width(320))
			.delivery(defaultImage(defaultImageSrc));
		const src = image.toURL();
		return src;
	}

	$: imageIds = imageIds.length > 0 ? imageIds : [defaultImageSrc];
</script>

<Splide
	hasTrack={false}
	aria-label="My Favorite Images"
	options={{ type: 'fade', rewind: true, height: 400, lazyLoad: 'nearby', speed: 1000 }}
>
	<div class="splide__arrows" class:hidden={imageIds.length < 2} on:click|stopPropagation />
	<SplideTrack>
		{#each imageIds as imageId}
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
