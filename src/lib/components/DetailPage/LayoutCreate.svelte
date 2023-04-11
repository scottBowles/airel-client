<script lang="ts">
	import CloudinaryUpload from '$lib/components/CloudinaryUpload.svelte';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import QuillEditor from '../QuillEditor.svelte';
	import Spacer from '../Spacer.svelte';
	import LayoutBase from './LayoutBase.svelte';
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
	<!-- <div slot="mainImage" class="w-full max-w-xs mx-auto">
		<CloudinaryUpload {onImageUpload}>
			<ImageCarousel {imageIds} alt={name ?? ''} />
		</CloudinaryUpload>
		<Spacer />
	</div> -->

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
	<div slot="properties" />

	<!-- MARKDOWN NOTES -->
	<QuillEditor slot="markdownNotes" init="" />
</LayoutBase>
