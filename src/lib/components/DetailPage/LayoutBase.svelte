<script lang="ts">
	import Spacer from '../Spacer.svelte';
	export let clearfix = false;
</script>

<div class="container mx-auto mt-2 mb-32 px-8">
	<slot />

	<!-- TOP ROW -->
	<div class="top-row">
		<span class="name-container">
			<!-- NAME -->
			<slot name="name" />
		</span>

		<!-- EDIT / SAVE + LOCKED BY {USER} -->
		<span class="locked-edit-save-container">
			<slot name="lockedBy" />
		</span>
	</div>

	<!-- HR -->
	<hr class="mt-2 mb-4" />

	<div class:clearfix class="max-w-full">
		<!-- FLOAT AREA -->
		<div class="sm:float-right w-full sm:w-2/5 ml-2">
			<!-- IMAGES -->
			<slot name="mainImage" class="w-full" />

			<slot name="logs" />
			<Spacer />
		</div>

		<!-- DESCRIPTION -->
		<slot name="description" />
		<Spacer />

		<!-- PROPERTIES -->
		<slot name="properties" />
		<Spacer />

		<!-- RELATED -->
		<slot name="related" />
	</div>

	<Spacer />
	<Spacer lg />

	<!-- MARKDOWN NOTES -->
	<slot name="markdownNotes" />
</div>

<style>
	.clearfix::after {
		content: '';
		clear: both;
		display: table;
	}
	.top-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.name-container {
		flex-grow: 3;
	}
	.locked-edit-save-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex: 1;
		gap: 2rem;
		min-width: fit-content;
	}
	hr {
		color: #ccc;
	}
	:global(:root) {
		--detail-layout-input-width: clamp(56%, (370px - 100%) * 1000, 100%);
	}
	:global(.description-text) {
		font-style: italic;
	}
	:global(.detail-layout-input) {
		width: var(--detail-layout-input-width);
	}
</style>
