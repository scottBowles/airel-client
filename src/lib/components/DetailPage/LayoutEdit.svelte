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

	const unlockMutation = new UnlockStore();
	const addLogMutation = new AddEntityLogStore();
	const removeLogMutation = new RemoveEntityLogStore();
	const addImageMutation = new EntityAddImageStore();

	export let entity: EntityEditFields;

	$: data = fragment(
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
							name
						}
					}
				}
			}
		`)
	);

	$: ({ id, name, description, markdownNotes, logs, imageIds = [], lockUser } = $data);

	const modalId = `discard-changes-modal-${id}`;

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
			value={name}
			class="input input-bordered w-full max-w-xs"
			required
		/>
	</div>

	<!-- EDIT / SAVE + LOCKED BY {USER} -->
	<svelte:fragment slot="lockedBy">
		<span>Locked by {lockUser?.username ?? 'Unknown'}</span>
		<label for={modalId} class="btn btn-ghost btn-sm icon-btn modal-button"
			><div class="tooltip" data-tip="Discard changes">
				<span class="icon"><FaUndoAlt /></span>
			</div></label
		>

		<input type="checkbox" id={modalId} class="modal-toggle" />
		<label for={modalId} class="modal modal-bottom sm:modal-middle cursor-pointer">
			<label class="modal-box relative" for="">
				<h3 class="font-bold text-lg">Discard changes</h3>
				<p class="py-4">Are you sure you want to discard any unsaved changes?</p>
				<div class="modal-action">
					<label for={modalId} class="btn" on:click={unlock} on:keypress={unlock}>Yes</label>
					<label for={modalId} class="btn">No</label>
				</div>
			</label>
		</label>

		<button type="submit" class="btn btn-ghost btn-sm icon-btn"
			><div class="tooltip" data-tip="Save"><span class="icon"><FaSave /></span></div></button
		>
	</svelte:fragment>

	<!-- MAIN IMAGE -->
	<div slot="mainImage" class="w-full max-w-xs mx-auto">
		<CloudinaryUpload {onImageUpload}>
			<ImageCarousel {imageIds} alt={name ?? ''} />
		</CloudinaryUpload>
		<Spacer />
	</div>

	<!-- LOGS -->
	<svelte:fragment slot="logs">
		<LogsDisplay {logs} {onLogAdd} {onLogRemove} />
		<Spacer />
	</svelte:fragment>

	<!-- DESCRIPTION -->
	<div slot="description" class="form-control">
		<label for="description-input" class="label">
			<span class="label-text">Description</span>
		</label>
		<textarea
			id="description-input"
			name="description"
			value={description}
			class="textarea textarea-bordered w-full max-w-xs"
		/>
	</div>

	<!-- PROPERTIES -->
	<slot name="properties" slot="properties" />

	<!-- MARKDOWN NOTES -->
	<QuillEditor init={markdownNotes ?? undefined} slot="markdownNotes" />
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
