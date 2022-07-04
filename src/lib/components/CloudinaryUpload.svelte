<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let onImageUpload;

	let uploadWidget;

	async function destroyWidget() {
		await uploadWidget?.destroy();
		uploadWidget = null;
	}

	function loadWidget() {
		uploadWidget ??= window?.cloudinary?.createUploadWidget(
			{
				cloudName: 'scottBowles',
				uploadPreset: 'ubste3oi'
			},
			onImageUpload
		);
	}

	function openWidget() {
		uploadWidget?.open();
	}

	onMount(loadWidget);
	onDestroy(destroyWidget);
</script>

<svelte:head>
	<script
		src="https://upload-widget.cloudinary.com/global/all.js"
		type="text/javascript"
		async
		on:load={loadWidget}></script>
</svelte:head>

<span on:click={openWidget}>
	<slot>this is a slot for a component which will open the cloudinary upload widget on click</slot>
</span>

<style>
	span {
		cursor: pointer;
	}
</style>
