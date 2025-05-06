<script lang="ts">
	import Spacer from '../Spacer.svelte';
	interface Props {
		clearfix?: boolean;
		children?: import('svelte').Snippet;
		name?: import('svelte').Snippet;
		lockedBy?: import('svelte').Snippet;
		mainImage?: import('svelte').Snippet;
		logs?: import('svelte').Snippet;
		description?: import('svelte').Snippet;
		properties?: import('svelte').Snippet;
		related?: import('svelte').Snippet;
		markdownNotes?: import('svelte').Snippet;
	}

	let {
		clearfix = false,
		children,
		name,
		lockedBy,
		mainImage,
		logs,
		description,
		properties,
		related,
		markdownNotes
	}: Props = $props();
</script>

<div class="container mx-auto mt-2 mb-32 px-8">
	{@render children?.()}

	<!-- TOP ROW -->
	<div class="top-row">
		<span class="name-container">
			<!-- NAME -->
			{@render name?.()}
		</span>

		<!-- EDIT / SAVE + LOCKED BY {USER} -->
		<span class="locked-edit-save-container">
			{@render lockedBy?.()}
		</span>
	</div>

	<!-- HR -->
	<hr class="mt-2 mb-4" />

	<div class:clearfix class="max-w-full">
		<!-- FLOAT AREA -->
		<div class="ml-2 w-full sm:float-right sm:w-2/5">
			<!-- IMAGES -->
			{@render mainImage?.()}

			{@render logs?.()}
			<Spacer />
		</div>

		<!-- DESCRIPTION -->
		{@render description?.()}
		<Spacer />

		<!-- PROPERTIES -->
		{@render properties?.()}
		<Spacer />

		<!-- RELATED -->
		{@render related?.()}
	</div>

	<Spacer />
	<Spacer lg />

	<!-- MARKDOWN NOTES -->
	{@render markdownNotes?.()}
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
