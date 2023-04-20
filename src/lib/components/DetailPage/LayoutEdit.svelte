<script lang="ts">
	import CloudinaryUpload from '$lib/components/CloudinaryUpload.svelte';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import { onMount } from 'svelte';
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
		type EntityEditFields
	} from '$houdini';
	import { somethingWentWrong } from '$lib/utils';

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

	let isMounted = false;
	onMount(() => {
		isMounted = true;
	});
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
		<span>Locked by {lockUser?.username ?? 'Unknown'}</span> <button type="submit">Save</button>
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
	<svelte:fragment slot="properties" />

	<!-- MARKDOWN NOTES -->
	<QuillEditor init={markdownNotes ?? undefined} slot="markdownNotes" />
</LayoutBase>
