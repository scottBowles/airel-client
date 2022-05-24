<script lang="ts">
	import { Layout, StatusHandler } from '$lib/components/DetailPage';

	export let onEditClick = () => {};
	export let onFormSubmit;
	export let onImageUpload;
	export let association;
	export let status = undefined;
	export let errors = [];
	export let creating = false;

	$: ({ imageIds = [], lockUser, lockedBySelf } = $association || {});
</script>

<StatusHandler {status} {errors} value={$association} entityName="association">
	<Layout
		bind:name={$association.name}
		bind:description={$association.description}
		bind:markdownNotes={$association.markdownNotes}
		{imageIds}
		{lockUser}
		{lockedBySelf}
		{onEditClick}
		{onFormSubmit}
		{onImageUpload}
		{creating}
	/>
</StatusHandler>
