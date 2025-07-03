<svelte:options runes={true} />

<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	interface Props extends HTMLTextareaAttributes {
		value?: string | null;
	}

	let { value = $bindable(''), ...rest }: Props = $props();
</script>

<div class="textarea-grow-wrap textarea w-fit {rest.class}" data-replicated-value={value}>
	<textarea bind:value {...rest}></textarea>
</div>

<style>
	.textarea-grow-wrap {
		/* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
		display: grid;
	}
	.textarea-grow-wrap::after {
		/* Note the weird space! Needed to preventy jumpy behavior */
		content: attr(data-replicated-value) ' ';

		/* This is how textarea text behaves */
		white-space: pre-wrap;

		/* Hidden from view, clicks, and screen readers */
		visibility: hidden;
	}
	.textarea-grow-wrap > textarea {
		/* You could leave this, but after a user resizes, then it ruins the auto sizing */
		resize: none;

		/* Firefox shows scrollbar on growth, you can hide like this. */
		overflow: hidden;
	}
	.textarea-grow-wrap > textarea,
	.textarea-grow-wrap::after {
		/* Identical styling required!! */
		padding: 0;
		font: inherit;
		border: none;
		box-shadow: none;

		/* Place on top of each other */
		grid-area: 1 / 1 / 2 / 2;
	}
</style>
