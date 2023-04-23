<script lang="ts">
	import { GetOrCreateGameLogStore } from '$houdini';
	import CloudinaryUpload from '$lib/components/CloudinaryUpload.svelte';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import { somethingWentWrong } from '$lib/utils';
	import LayoutBase from './LayoutBase.svelte';
	import LogsDisplay from './LogsDisplay.svelte';
	import Spacer from '../Spacer.svelte';
	import QuillEditor from '../QuillEditor.svelte';

	const getOrCreateLogMutation = new GetOrCreateGameLogStore();

	let imageIds: string[] = [];
	let logs: any = [];

	$: logIds = logs.map((log: any) => log.id);

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
		if (res.data) {
			logs = [...logs, res.data.getOrCreateGameLog];
		}
	};

	const onLogRemove = (logId: string) => {
		logs = logs.filter((log: any) => log.id !== logId);
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
			class="input input-bordered w-full max-w-xs"
			required
		/>
	</div>

	<!-- EDIT / SAVE + LOCKED BY {USER} -->
	<button slot="lockedBy" class="ml-auto" type="submit">Save</button>

	<!-- MAIN IMAGE -->
	<div slot="mainImage" class="w-full max-w-xs mx-auto">
		<CloudinaryUpload {onImageUpload}>
			<ImageCarousel {imageIds} alt={'uploaded images'} />
		</CloudinaryUpload>
		<input type="hidden" name="imageIds" bind:value={imageIds} />
		<Spacer />
	</div>

	<!-- LOGS -->
	<svelte:fragment slot="logs">
		<LogsDisplay {logs} {onLogAdd} {onLogRemove} />
		<input type="hidden" name="logs" value={logIds} />
		<Spacer />
	</svelte:fragment>

	<!-- DESCRIPTION -->
	<div slot="description" class="form-control">
		<label for="description-input" class="label">
			<span class="label-text">Description</span>
		</label>
		<textarea
			name="description"
			id="description-input"
			class="textarea textarea-bordered w-full max-w-xs"
		/>
	</div>

	<!-- PROPERTIES -->
	<slot name="properties" slot="properties" />

	<!-- MARKDOWN NOTES -->
	<QuillEditor slot="markdownNotes" init="" />
</LayoutBase>
