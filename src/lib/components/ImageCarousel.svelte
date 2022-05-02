<script lang="ts">
	import LargeImage from '$lib/components/LargeImage.svelte';
	export let imageIds;
	let currentIndex = 0;
	$: currentImageId = imageIds[Math.abs(currentIndex % imageIds.length)];
	$: console.log({ imageIds });
	$: console.log({ currentImageId });
</script>

<div class="img-container">
	<div
		class="carousel-arrow arrow-left"
		on:click|stopPropagation={() => {
			currentIndex--;
			console.log(currentImageId);
		}}
	>
		&#10094;
	</div>
	<LargeImage imageId={currentImageId} />
	<div
		class="carousel-arrow arrow-right"
		on:click|stopPropagation={() => {
			currentIndex++;
			console.log(currentImageId);
		}}
	>
		&#10095;
	</div>
</div>

<style>
	.carousel-arrow {
		cursor: pointer;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		height: 30px;
		width: 30px;
		display: grid;
		place-items: center;
		background-color: rgba(0, 0, 0, 0.25);
		color: white;
		font-weight: bold;
		font-size: 19px;
		transition: 0.4s ease;
		border-radius: 100%;
		user-select: none;
	}
	.arrow-left {
		left: 10px;
	}
	.arrow-right {
		right: 10px;
	}
	.carousel-arrow:hover {
		background-color: rgba(0, 0, 0, 0.4);
	}
	.img-container {
		width: fit-content;
		height: fit-content;
		position: relative;
	}
</style>
