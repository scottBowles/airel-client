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
						<TextInput
							variation="block"
							name="description"
							value={description}
							placeholder="Description"
						/>
						<!-- <input name="description" value={description} placeholder="Description" /> -->
					{:else}
						{description}
					{/if}
				</Text>
			</BasicProperty>
		</svelte:fragment>
	</Layout>
</StatusHandler>
