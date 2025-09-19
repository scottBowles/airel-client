<script lang="ts">
	import type { Snippet } from 'svelte';
	import Spacer from '../Spacer.svelte';
	interface Props {
		clearfix?: boolean;
		children?: Snippet;
		nameSnippet?: Snippet;
		lockedBySnippet?: Snippet;
		mainImageSnippet?: Snippet;
		logsSnippet?: Snippet;
		descriptionSnippet?: Snippet;
		propertiesSnippet?: Snippet;
		relatedSnippet?: Snippet;
		markdownNotesSnippet?: Snippet;
	}

	let {
		clearfix = false,
		children,
		nameSnippet,
		lockedBySnippet,
		mainImageSnippet,
		logsSnippet,
		descriptionSnippet,
		propertiesSnippet,
		relatedSnippet,
		markdownNotesSnippet
	}: Props = $props();
</script>

<div class="container mx-auto mt-2 mb-32 px-8">
	{@render children?.()}

	<!-- TOP ROW -->
	<div class="top-row">
		<span class="name-container">
			<!-- NAME -->
			{@render nameSnippet?.()}
		</span>

		<!-- EDIT / SAVE + LOCKED BY {USER} -->
		<span class="locked-edit-save-container">
			{@render lockedBySnippet?.()}
		</span>
	</div>

	<!-- HR -->
	<hr class="mt-2 mb-4" />

	<div class:clearfix class="max-w-full">
		<!-- FLOAT AREA -->
		<div class="ml-2 w-full sm:float-right sm:w-2/5">
			<!-- IMAGES -->
			{@render mainImageSnippet?.()}

			{@render logsSnippet?.()}
			<Spacer />
		</div>

		<!-- DESCRIPTION -->
		{@render descriptionSnippet?.()}
		<Spacer />

		<!-- PROPERTIES -->
		{@render propertiesSnippet?.()}
		<Spacer />

		<!-- RELATED -->
		{@render relatedSnippet?.()}
	</div>

	<Spacer />
	<Spacer lg />

	<!-- MARKDOWN NOTES -->
	{@render markdownNotesSnippet?.()}
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
		font-family: var(--font-content);
	}
	:global(.detail-layout-input) {
		width: var(--detail-layout-input-width);
	}
</style>
