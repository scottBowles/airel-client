<script lang="ts">
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import BasicProperty from '$lib/components/DetailPage/BasicProperty.svelte';
	import { Text, TextInput } from '@kahi-ui/framework';

	export let onEditClick = () => {};
	export let onFormSubmit;
	export let onImageUpload;
	export let npc;
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
	} = npc || {});
	$: editing = lockedBySelf || creating;
</script>

<StatusHandler {status} {errors} value={npc} entityName="npc">
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
						<div class="description-input">
							<TextInput
								variation="block"
								is="textarea"
								name="description"
								value={description}
								placeholder="Description"
								resizable
							/>
						</div>
						<!-- <input name="description" value={description} placeholder="Description" /> -->
					{:else}
						{description}
					{/if}
				</Text>
			</BasicProperty>
		</svelte:fragment>
	</Layout>
</StatusHandler>

<style>
	.description-input {
		display: inline-block;
		width: auto;
	}
</style>
