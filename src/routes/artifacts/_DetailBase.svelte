<script lang="ts">
	import { Layout, StatusHandler } from '$lib/components/DetailPage';

	export let onEditClick = () => {};
	export let onFormSubmit;
	export let onImageUpload;
	export let artifact;
	export let status = undefined;
	export let errors = [];
	export let creating = false;

	$: ({ imageIds = [], lockUser, lockedBySelf } = $artifact || {});
</script>

<StatusHandler {status} {errors} value={$artifact} entityName="artifact">
	<Layout
		bind:name={$artifact.name}
		bind:description={$artifact.description}
		bind:markdownNotes={$artifact.markdownNotes}
		{imageIds}
		{lockUser}
		{lockedBySelf}
		{onEditClick}
		{onFormSubmit}
		{onImageUpload}
		{creating}
	/>
</StatusHandler>
