<script lang="ts">
	import CloudinaryUpload from '$lib/components/CloudinaryUpload.svelte';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import { onMount } from 'svelte';
	import QuillEditor from '../QuillEditor.svelte';
	import Spacer from '../Spacer.svelte';
	import LayoutBase from './LayoutBase.svelte';
	import LogsDisplay from './LogsDisplay.svelte';

	export let id: string | undefined = undefined;
	export let name: string | null = '';
	export let description: string | null = '';
	export let markdownNotes: string | null = '';
	export let imageIds: string[] = [];
	export let logs: any = undefined;
	export let lockUser: any = undefined;
	export let onImageUpload: (error: any, result: any) => Promise<void>;

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
		<span>Locked by {lockUser.username}</span> <button type="submit">Save</button>
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
		<LogsDisplay {logs} {id} />
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
