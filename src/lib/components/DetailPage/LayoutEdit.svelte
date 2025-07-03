<script lang="ts">
	import FaUndoAlt from 'svelte-icons/fa/FaUndoAlt.svelte';
	import FaSave from 'svelte-icons/fa/FaSave.svelte';
	import CloudinaryUpload from '$lib/components/CloudinaryUpload.svelte';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import QuillEditor from '../QuillEditor.svelte';
	import Spacer from '../Spacer.svelte';
	import LayoutBase from './LayoutBase.svelte';
	import LogsDisplay from './LogsDisplay.svelte';
	import {
		AddEntityLogStore,
		EntityAddImageStore,
		RemoveEntityLogStore,
		fragment,
		graphql,
		type EntityEditFields,
		UnlockStore
	} from '$houdini';
	import { somethingWentWrong } from '$lib/utils';
	import { page } from '$app/state';
	import RelatedArtifactMultiSelect from '../RelatedArtifactMultiSelect.svelte';
	import RelatedAssociationMultiSelect from '../RelatedAssociationMultiSelect.svelte';
	import RelatedCharacterMultiSelect from '../RelatedCharacterMultiSelect.svelte';
	import RelatedItemMultiSelect from '../RelatedItemMultiSelect.svelte';
	import RelatedPlaceMultiSelect from '../RelatedPlaceMultiSelect.svelte';
	import RelatedRaceMultiSelect from '../RelatedRaceMultiSelect.svelte';
	import type { Snippet } from 'svelte';
	import TextAreaAutoGrow from '../TextAreaAutoGrow.svelte';

	const unlockMutation = new UnlockStore();
	const addLogMutation = new AddEntityLogStore();
	const removeLogMutation = new RemoveEntityLogStore();
	const addImageMutation = new EntityAddImageStore();

	interface Props {
		entity: EntityEditFields;
		properties?: Snippet;
	}

	let { entity, properties }: Props = $props();

	let data = $derived(
		fragment(
			entity,
			graphql(`
				fragment EntityEditFields on Entity {
					id
					name
					description
					imageIds
					markdownNotes
					lockUser {
						id
						username
					}
					logs {
						edges {
							node {
								id
								url
								title
							}
						}
					}
					relatedArtifacts {
						edges {
							node {
								id
								name
							}
						}
					}
					relatedAssociations {
						edges {
							node {
								id
								name
							}
						}
					}
					relatedCharacters {
						edges {
							node {
								id
								name
							}
						}
					}
					relatedItems {
						edges {
							node {
								id
								name
							}
						}
					}
					relatedPlaces {
						edges {
							node {
								id
								name
							}
						}
					}
					relatedRaces {
						edges {
							node {
								id
								name
							}
						}
					}
				}
			`)
		)
	);

	let { id, name, description, markdownNotes, logs, imageIds = [], lockUser } = $derived($data);
	let relatedArtifactIds = $derived($data.relatedArtifacts?.edges.map(({ node }) => node.id) || []);
	let relatedAssociationsIds = $derived(
		$data.relatedAssociations?.edges.map(({ node }) => node.id) || []
	);
	let relatedCharactersIds = $derived(
		$data.relatedCharacters?.edges.map(({ node }) => node.id) || []
	);
	let relatedItemsIds = $derived($data.relatedItems?.edges.map(({ node }) => node.id) || []);
	let relatedPlacesIds = $derived($data.relatedPlaces?.edges.map(({ node }) => node.id) || []);
	let relatedRacesIds = $derived($data.relatedRaces?.edges.map(({ node }) => node.id) || []);

	let modalId = $derived(`discard-changes-modal-${id}`);

	const unlock = () => unlockMutation.mutate({ id });

	const onLogAdd = async (logUrl: string) => {
		const res = await addLogMutation.mutate({ entityId: id, logUrl });
		if (res.errors) somethingWentWrong(res.errors[0].message);
	};

	const onLogRemove = async (logId: string) => {
		const res = await removeLogMutation.mutate({ entityId: id, logId });
		if (res.errors) somethingWentWrong(res.errors[0].message);
	};

	const onImageUpload = async (error: any, result: any) => {
		if (error) return somethingWentWrong(error.message);

		const isImageUploadedEvent = result?.event === 'success';
		if (!isImageUploadedEvent) return;

		const imageId = result.info.public_id;
		const res = await addImageMutation.mutate({ id, imageId });
		if (res.errors) somethingWentWrong(res.errors[0].message);
	};

	const properties_render = $derived(properties);
</script>

<LayoutBase clearfix>
	<!-- NAME -->
	{#snippet nameSnippet()}
		<fieldset class="fieldset">
			<label class="label" for="name-input">Name</label>
			<input type="text" id="name-input" name="name" value={name} class="input" required />
		</fieldset>
	{/snippet}

	<!-- EDIT / SAVE + LOCKED BY {USER} -->
	{#snippet lockedBySnippet()}
		<span>Locked by {lockUser?.username ?? 'Unknown'}</span>
		<label for={modalId} class="btn btn-ghost btn-sm icon-btn modal-button"
			><div class="tooltip" data-tip="Discard changes">
				<span class="icon"><FaUndoAlt /></span>
			</div></label
		>

		<input type="checkbox" id={modalId} class="modal-toggle" />
		<label for={modalId} class="modal modal-bottom sm:modal-middle cursor-pointer">
			<label class="modal-box relative" for="">
				<h3 class="text-lg font-bold">Discard changes</h3>
				<p class="py-4">Are you sure you want to discard any unsaved changes?</p>
				<div class="modal-action">
					<label for={modalId} class="btn btn-neutral" onclick={unlock} onkeypress={unlock}
						>Yes</label
					>
					<label for={modalId} class="btn btn-neutral">No</label>
				</div>
			</label>
		</label>

		<button type="submit" class="btn btn-ghost btn-sm icon-btn"
			><div class="tooltip" data-tip="Save"><span class="icon"><FaSave /></span></div></button
		>
	{/snippet}

	<!-- MAIN IMAGE -->
	{#snippet mainImageSnippet()}
		<div class="mx-auto w-full">
			{#if page.data.me?.isStaff}
				<CloudinaryUpload {onImageUpload}>
					<ImageCarousel {imageIds} alt={name ?? ''} />
				</CloudinaryUpload>
			{:else}
				<ImageCarousel {imageIds} alt={name ?? ''} />
			{/if}

			<Spacer />
		</div>
	{/snippet}

	<!-- LOGS -->
	{#snippet logsSnippet()}
		<LogsDisplay {logs} {onLogAdd} {onLogRemove} />
		<Spacer />
	{/snippet}

	<!-- DESCRIPTION -->
	{#snippet descriptionSnippet()}
		<fieldset class="fieldset">
			<label class="label" for="description-input">Brief</label>
			<TextAreaAutoGrow
				id="description-input"
				name="description"
				bind:value={description}
				class="textarea w-full"
			/>
		</fieldset>
	{/snippet}

	<!-- PROPERTIES -->
	{#snippet propertiesSnippet()}
		{@render properties_render?.()}
	{/snippet}

	<!-- RELATED -->
	{#snippet relatedSnippet()}
		<div>
			<h2 class="text-2xl font-bold">Related</h2>
			<RelatedArtifactMultiSelect
				id="related-artifacts"
				inputGroupName="relatedArtifacts"
				entityDisplayName="Artifacts"
				ids={relatedArtifactIds}
			/>
			<RelatedAssociationMultiSelect
				id="related-associations"
				inputGroupName="relatedAssociations"
				entityDisplayName="Associations"
				ids={relatedAssociationsIds}
			/>
			<RelatedCharacterMultiSelect
				id="related-characters"
				inputGroupName="relatedCharacters"
				entityDisplayName="Characters"
				ids={relatedCharactersIds}
			/>
			<RelatedItemMultiSelect
				id="related-items"
				inputGroupName="relatedItems"
				entityDisplayName="Items"
				ids={relatedItemsIds}
			/>
			<RelatedPlaceMultiSelect
				id="related-places"
				inputGroupName="relatedPlaces"
				entityDisplayName="Places"
				ids={relatedPlacesIds}
			/>
			<RelatedRaceMultiSelect
				id="related-races"
				inputGroupName="relatedRaces"
				entityDisplayName="Races"
				ids={relatedRacesIds}
			/>
		</div>
	{/snippet}

	<!-- MARKDOWN NOTES -->
	{#snippet markdownNotesSnippet()}
		<QuillEditor init={markdownNotes ?? undefined} />
	{/snippet}
</LayoutBase>

<style>
	.icon {
		display: inline-block;
		height: 16px;
		width: 16px;
	}

	.icon-btn:hover {
		color: #908149;
	}

	.tooltip {
		text-transform: none;
	}
</style>
