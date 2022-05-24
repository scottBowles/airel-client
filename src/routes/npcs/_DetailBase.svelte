<script lang="ts">
	import { Layout, StatusHandler } from '$lib/components/DetailPage';

	export let onEditClick = () => {};
	export let onFormSubmit;
	export let onImageUpload;
	export let npc;
	export let status = undefined;
	export let errors = [];
	export let creating = false;

	$: ({ imageIds = [], lockUser, lockedBySelf } = $npc || {});
</script>

<StatusHandler {status} {errors} value={$npc} entityName="npc">
	<Layout
		bind:name={$npc.name}
		bind:description={$npc.description}
		bind:markdownNotes={$npc.markdownNotes}
		{imageIds}
		{lockUser}
		{lockedBySelf}
		{onEditClick}
		{onFormSubmit}
		{onImageUpload}
		{creating}
	/>
</StatusHandler>
