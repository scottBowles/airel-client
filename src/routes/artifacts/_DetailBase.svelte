<script lang="ts">
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import BasicProperty from '$lib/components/DetailPage/BasicProperty.svelte';
	import { Text, TextInput } from '@kahi-ui/framework';

	export let onEditClick = () => {};
	export let onFormSubmit;
	export let onImageUpload;
	export let artifact;
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
	} = artifact || {});
	$: editing = lockedBySelf || creating;
</script>

<StatusHandler {status} {errors} value={artifact} entityName="artifact">
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
						<!-- <TextInput
					span_x={'30'}
					variation="block"
					name="name"
					placeholder="Name"
					value={name}
					required
				/> -->
						<TextInput
							variation="block"
							name="description"
							value={description}
							placeholder="Description"
						/>
					{:else}
						{description}
					{/if}
				</Text>
			</BasicProperty>
		</svelte:fragment>
	</Layout>
</StatusHandler>
