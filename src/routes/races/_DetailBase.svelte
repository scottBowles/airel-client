<script lang="ts">
	import { Layout, StatusHandler } from '$lib/components/DetailPage';

	export let onEditClick = () => {};
	export let onFormSubmit;
	export let onImageUpload;
	export let race = {};
	export let form;
	export let status = undefined;
	export let errors = [];
	export let creating = false;

	$: ({
		id,
		name,
		description,
		markdownNotes,
		imageIds = [],
		lockUser,
		lockedBySelf,
		logs
	} = race || {});
</script>

<StatusHandler {status} {errors} value={race} entityName="race">
	<Layout
		{id}
		{form}
		{name}
		{description}
		{markdownNotes}
		{imageIds}
		{logs}
		{lockUser}
		{lockedBySelf}
		{onEditClick}
		{onFormSubmit}
		{onImageUpload}
		{creating}
	/>
</StatusHandler>
