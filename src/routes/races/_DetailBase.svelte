<script lang="ts">
	import { Layout, StatusHandler } from '$lib/components/DetailPage';

	export let onEditClick = () => {};
	export let onFormSubmit;
	export let onImageUpload;
	export let race;
	export let status = undefined;
	export let errors = [];
	export let creating = false;

	$: ({ imageIds = [], lockUser, lockedBySelf } = $race || {});
</script>

<StatusHandler {status} {errors} value={$race} entityName="race">
	<Layout
		bind:name={$race.name}
		bind:description={$race.description}
		bind:markdownNotes={$race.markdownNotes}
		{imageIds}
		{lockUser}
		{lockedBySelf}
		{onEditClick}
		{onFormSubmit}
		{onImageUpload}
		{creating}
	/>
</StatusHandler>
