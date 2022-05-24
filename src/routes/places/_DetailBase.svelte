<script lang="ts">
	import { Layout, StatusHandler } from '$lib/components/DetailPage';

	export let onEditClick = () => {};
	export let onFormSubmit;
	export let onImageUpload;
	export let place;
	export let status = undefined;
	export let errors = [];
	export let creating = false;

	$: ({ imageIds = [], lockUser, lockedBySelf } = $place || {});
</script>

<StatusHandler {status} {errors} value={$place} entityName="place">
	<Layout
		bind:name={$place.name}
		bind:description={$place.description}
		bind:markdownNotes={$place.markdownNotes}
		{imageIds}
		{lockUser}
		{lockedBySelf}
		{onEditClick}
		{onFormSubmit}
		{onImageUpload}
		{creating}
	/>
</StatusHandler>
