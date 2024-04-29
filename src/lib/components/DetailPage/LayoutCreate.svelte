<script lang="ts">
	import { GetOrCreateGameLogStore } from '$houdini';
	import CloudinaryUpload from '$lib/components/CloudinaryUpload.svelte';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import { somethingWentWrong } from '$lib/utils';
	import LayoutBase from './LayoutBase.svelte';
	import LogsDisplay from './LogsDisplay.svelte';
	import Spacer from '../Spacer.svelte';
	import QuillEditor from '../QuillEditor.svelte';
	import { page } from '$app/stores';
	import RelatedArtifactMultiSelect from '../RelatedArtifactMultiSelect.svelte';
	import RelatedAssociationMultiSelect from '../RelatedAssociationMultiSelect.svelte';
	import RelatedCharacterMultiSelect from '../RelatedCharacterMultiSelect.svelte';
	import RelatedItemMultiSelect from '../RelatedItemMultiSelect.svelte';
	import RelatedPlaceMultiSelect from '../RelatedPlaceMultiSelect.svelte';
	import RelatedRaceMultiSelect from '../RelatedRaceMultiSelect.svelte';

	type Log = {
		readonly id: string;
		readonly url: string;
		readonly title: string | null;
		readonly googleId: string | null;
		readonly lockedBySelf: boolean;
		readonly __typename: 'GameLog';
	};

	const getOrCreateLogMutation = new GetOrCreateGameLogStore();

	export let name = '';

	let imageIds: string[] = [];
	let logs: Log[] = [];

	$: logIds = logs.map((log) => log.id);

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
	<div slot="name" class="form-control">
		<label for="name-input" class="label">
			<span class="label-text">Name</span>
		</label>
		<input
			type="text"
			id="name-input"
			name="name"
			bind:value={name}
			class="input input-bordered"
			required
		/>
	</div>

	<!-- EDIT / SAVE + LOCKED BY {USER} -->
	<button slot="lockedBy" type="submit" class="btn btn-ghost btn-sm btn-custom ml-auto">Save</button
	>

	<!-- MAIN IMAGE -->
	<div slot="mainImage" class="w-full max-w-xs mx-auto">
		{#if $page.data.me?.isStaff}
			<CloudinaryUpload {onImageUpload}>
				<ImageCarousel {imageIds} alt={'uploaded images'} />
			</CloudinaryUpload>
		{:else}
			<ImageCarousel {imageIds} alt={'uploaded images'} />
		{/if}

		<Spacer />

		<!-- Hidden inputs -->
		{#each imageIds as imageId, i}
			<input type="hidden" name={`imageIds[${i}]`} value={imageId} />
		{/each}
	</div>

	<!-- LOGS -->
	<svelte:fragment slot="logs">
		<LogsDisplay {logs} {onLogAdd} {onLogRemove} />
		<Spacer />

		<!-- Hidden inputs -->
		{#each logIds as logId, i}
			<input type="hidden" name={`logs[${i}]`} value={logId} />
		{/each}
	</svelte:fragment>

	<!-- DESCRIPTION -->
	<div slot="description" class="form-control">
		<label for="description-input" class="label">
			<span class="label-text">Description</span>
		</label>
		<textarea name="description" id="description-input" class="textarea textarea-bordered w-full"
		></textarea>
	</div>

	<!-- PROPERTIES -->
	<slot name="properties" slot="properties" />

	<!-- RELATED -->
	<div slot="related">
		<h2 class="text-2xl font-bold">Related</h2>
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

	<!-- MARKDOWN NOTES -->
	<QuillEditor slot="markdownNotes" init="" />
</LayoutBase>

<style>
	.btn-custom {
		text-transform: none;
	}
	.btn-custom:hover {
		color: #908149;
	}
</style>
