<script lang="ts">
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import BasicProperty from '$lib/components/DetailPage/BasicProperty.svelte';
	import { Text } from '@kahi-ui/framework';

	export let onEditClick = () => {};
	export let onFormSubmit;
	export let onImageUpload;
	export let association;
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
	} = association || {});
	$: editing = lockedBySelf || creating;
</script>

<StatusHandler {status} {errors} value={association} entityName="association">
	<Layout
		{name}
		{imageIds}
		{markdownNotes}
		{lockUser}
		{lockedBySelf}
		properties={{
			Description: description
		}}
		{onEditClick}
		{onFormSubmit}
		{onImageUpload}
		{creating}
	>
		<svelte:fragment slot="properties">
			<BasicProperty name="Description">
				<Text>
					{#if editing}
						<input name="description" value={description} placeholder="Description" />
					{:else}
						{description}
					{/if}
				</Text>
			</BasicProperty>
		</svelte:fragment>
	</Layout>
</StatusHandler>
