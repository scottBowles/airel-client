<script lang="ts">
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import BasicProperty from '$lib/components/DetailPage/BasicProperty.svelte';
	import { Text, TextInput } from '@kahi-ui/framework';

	export let onEditClick = () => {};
	export let onFormSubmit;
	export let onImageUpload;
	export let place;
	export let status = undefined;
	export let errors = [];
	export let creating = false;

	$: ({
		name = '',
		imageIds = [],
		description = '',
		markdownNotes = '',
		lockUser,
		lockedBySelf
	} = place || {});
	$: editing = lockedBySelf || creating;
</script>

<StatusHandler {status} {errors} value={place} entityName="place">
	<Layout
		{name}
		{description}
		{imageIds}
		{markdownNotes}
		{lockUser}
		{lockedBySelf}
		{onEditClick}
		{onFormSubmit}
		{onImageUpload}
		{creating}
	/>
</StatusHandler>
