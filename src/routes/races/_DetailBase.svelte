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
	export let patchStore = undefined;

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

	$: console.log({ status });
</script>

<StatusHandler status={creating ? 'DONE' : status} {errors} value={race} entityName="race">
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
		{patchStore}
		{creating}
	/>
</StatusHandler>
