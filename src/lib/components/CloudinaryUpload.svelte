<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let onImageUpload;
	let uploadWidget;
	let openWidget;

	onMount(() => {
		uploadWidget = window?.cloudinary?.createUploadWidget(
			{
				cloudName: 'scottBowles',
				uploadPreset: 'ubste3oi'
			},
			onImageUpload
		);

		openWidget = () => uploadWidget && uploadWidget.open();
	});

	onDestroy(async () => {
		await uploadWidget?.destroy();
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
