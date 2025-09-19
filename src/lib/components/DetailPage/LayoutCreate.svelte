<script lang="ts">
	import { page } from '$app/state';
	import { GetOrCreateGameLogStore } from '$houdini';
	import CloudinaryUpload from '$lib/components/CloudinaryUpload.svelte';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import { somethingWentWrong } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import QuillEditor from '../QuillEditor.svelte';
	import RelatedArtifactMultiSelect from '../RelatedArtifactMultiSelect.svelte';
	import RelatedAssociationMultiSelect from '../RelatedAssociationMultiSelect.svelte';
	import RelatedCharacterMultiSelect from '../RelatedCharacterMultiSelect.svelte';
	import RelatedItemMultiSelect from '../RelatedItemMultiSelect.svelte';
	import RelatedPlaceMultiSelect from '../RelatedPlaceMultiSelect.svelte';
	import RelatedRaceMultiSelect from '../RelatedRaceMultiSelect.svelte';
	import Spacer from '../Spacer.svelte';
	import LayoutBase from './LayoutBase.svelte';
	import LogsDisplay from './LogsDisplay.svelte';
	import TextAreaAutoGrow from '../TextAreaAutoGrow.svelte';

	type Log = {
		readonly id: string;
		readonly url: string;
		readonly title: string | null;
		readonly googleId: string | null;
		readonly lockedBySelf: boolean;
		readonly __typename: 'GameLog';
	};

	const getOrCreateLogMutation = new GetOrCreateGameLogStore();

	interface Props {
		name?: string;
		properties?: Snippet;
	}

	let { name = $bindable(''), properties: properties_render }: Props = $props();

	let imageIds: string[] = $state([]);
	let logs: Log[] = $state([]);

	let logIds = $derived(logs.map((log) => log.id));

	const onImageUpload = async (error: any, result: any) => {
		if (error) return somethingWentWrong(error.message);

		if (result?.event === 'success') {
			const newImageId = result.info.public_id;
			imageIds = [...imageIds, newImageId];
		}
	};

	const onLogAdd = async (url: string) => {
		const res = await getOrCreateLogMutation.mutate({ url });
		if (res.errors) {
			somethingWentWrong(res.errors[0].message);
		}
		if (res.data?.getOrCreateGameLog.__typename === 'GameLog') {
			logs = [...logs, res.data.getOrCreateGameLog];
		}
	};

	const onLogRemove = (logId: string) => {
		logs = logs.filter((log) => log.id !== logId);
	};
</script>

<LayoutBase clearfix>
	<!-- NAME -->
	{#snippet nameSnippet()}
		<fieldset class="fieldset">
			<label for="name-input" class="label">Name</label>
			<input type="text" id="name-input" name="name" bind:value={name} class="input" required />
		</fieldset>
	{/snippet}

	<!-- EDIT / SAVE + LOCKED BY {USER} -->
	{#snippet lockedBySnippet()}
		<button type="submit" class="btn btn-ghost btn-sm btn-custom ml-auto">Save</button>
	{/snippet}

	<!-- MAIN IMAGE -->
	{#snippet mainImageSnippet()}
		<div class="mx-auto w-full max-w-xs">
			{#if page.data.me?.isStaff}
				<CloudinaryUpload {onImageUpload}>
					<ImageCarousel {imageIds} alt="uploaded images" />
				</CloudinaryUpload>
			{:else}
				<ImageCarousel {imageIds} alt="uploaded images" />
			{/if}

			<Spacer />

			<!-- Hidden inputs -->
			{#each imageIds as imageId, i (`${i}--${imageId}`)}
				<input type="hidden" name={`imageIds[${i}]`} value={imageId} />
			{/each}
		</div>
	{/snippet}

	<!-- LOGS -->
	{#snippet logsSnippet()}
		<LogsDisplay {logs} {onLogAdd} {onLogRemove} />
		<Spacer />

		<!-- Hidden inputs -->
		{#each logIds as logId, i (`${i}--${logId}`)}
			<input type="hidden" name={`logs[${i}]`} value={logId} />
		{/each}
	{/snippet}

	<!-- DESCRIPTION -->
	{#snippet descriptionSnippet()}
		<fieldset class="fieldset">
			<label for="description-input" class="label"> Description </label>
			<TextAreaAutoGrow name="description" id="description-input" class="textarea w-full" />
		</fieldset>
	{/snippet}

	<!-- PROPERTIES -->
	{#snippet propertiesSnippet()}
		{@render properties_render?.()}
	{/snippet}

	<!-- RELATED -->
	{#snippet relatedSnippet()}
		<div>
			<h2 class="font-heading text-2xl font-bold">Related</h2>
			<RelatedArtifactMultiSelect
				id="related-artifacts"
				inputGroupName="relatedArtifacts"
				entityDisplayName="Artifacts"
			/>
			<RelatedAssociationMultiSelect
				id="related-associations"
				inputGroupName="relatedAssociations"
				entityDisplayName="Associations"
			/>
			<RelatedCharacterMultiSelect
				id="related-characters"
				inputGroupName="relatedCharacters"
				entityDisplayName="Characters"
			/>
			<RelatedItemMultiSelect
				id="related-items"
				inputGroupName="relatedItems"
				entityDisplayName="Items"
			/>
			<RelatedPlaceMultiSelect
				id="related-places"
				inputGroupName="relatedPlaces"
				entityDisplayName="Places"
			/>
			<RelatedRaceMultiSelect
				id="related-races"
				inputGroupName="relatedRaces"
				entityDisplayName="Races"
			/>
		</div>
	{/snippet}

	<!-- MARKDOWN NOTES -->
	{#snippet markdownNotesSnippet()}
		<QuillEditor init="" />
	{/snippet}
</LayoutBase>

<style>
	.btn-custom {
		text-transform: none;
	}
	.btn-custom:hover {
		color: #908149;
	}
</style>
