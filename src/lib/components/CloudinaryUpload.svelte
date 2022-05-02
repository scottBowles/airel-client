<script lang="ts">
	import { onMount } from 'svelte';

	export let handleImageUpload;
	let uploadWidget;
	let openWidget;

	onMount(() => {
		uploadWidget = window?.cloudinary?.createUploadWidget(
			{
				cloudName: 'scottBowles',
				uploadPreset: 'ubste3oi'
			},
			handleImageUpload
		);

		openWidget = () => uploadWidget && uploadWidget.open();
	});
</script>

<svelte:head>
	<script
		src="https://upload-widget.cloudinary.com/global/all.js"
		type="text/javascript"
		async></script>
</svelte:head>

<span on:click={openWidget}>
	<slot>this is a slot for a component which will open the cloudinary upload widget on click</slot>
</span>

<style>
	span {
		cursor: pointer;
	}
</style>
