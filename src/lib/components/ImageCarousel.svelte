<script lang="ts">
	import LargeImage from '$lib/components/LargeImage.svelte';
	import { onMount } from 'svelte';

	export let imageIds;

	let currentIndex = 0;
	let hasMounted;

	$: currentImageId = imageIds[Math.abs(currentIndex % imageIds.length)];

	onMount(() => (hasMounted = true));

	const incrementIndex = () => (currentIndex += 1);
	const decrementIndex = () => (currentIndex -= 1);
</script>

<div class="img-container">
	{#if imageIds.length > 1 && hasMounted}
		<div class="arrow left" on:click|stopPropagation={decrementIndex}>&#10094;</div>
	{/if}

	<LargeImage imageId={currentImageId} />

	{#if imageIds.length > 1 && hasMounted}
		<div class="arrow right" on:click|stopPropagation={incrementIndex}>&#10095;</div>
	{/if}
</div>

<style>
	.arrow {
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
	.arrow:hover {
		background-color: rgba(0, 0, 0, 0.4);
	}
	.left {
		left: 10px;
	}
	.right {
		right: 10px;
	}
	.img-container {
		width: fit-content;
		height: fit-content;
		position: relative;
	}
</style>
