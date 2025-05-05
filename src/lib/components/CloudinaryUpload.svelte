<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	interface Props {
		onImageUpload: (error: any, result: any) => Promise<void>;
		children?: import('svelte').Snippet;
	}

	let { onImageUpload, children }: Props = $props();

	let uploadWidget: any;

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
		onload={loadWidget}
	></script>
</svelte:head>

<span onclick={openWidget} onkeypress={openWidget} role="button" tabindex="0">
	{#if children}{@render children()}{:else}this is a slot for a component which will open the
		cloudinary upload widget on click{/if}
</span>

<style>
	span {
		cursor: pointer;
	}
</style>
