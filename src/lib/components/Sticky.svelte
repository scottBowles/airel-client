<!-- https://css-tricks.com/how-to-detect-when-a-sticky-element-gets-pinned/ -->
<svelte:options runes={true} />

<script lang="ts">
	import sticky from '$lib/actions/sticky';
	import type { Snippet } from 'svelte';

	interface Props {
		tag?: string;
		contentSnippet?: Snippet;
		stickySnippet?: Snippet<[{ isStuck: boolean }]>;
	}

	let { tag = 'div', contentSnippet, stickySnippet }: Props = $props();

	let isStuck = $state(false);

	function handleStuck(e: CustomEvent<{ isStuck: boolean }>) {
		isStuck = e.detail.isStuck;
	}
</script>

<svelte:element this={tag}>
	<!-- the `-top-px` style is needed for this to work -->
	<div use:sticky onstuck={handleStuck} class="sticky -top-px z-10">
		{@render stickySnippet?.({ isStuck })}
	</div>

	{@render contentSnippet?.()}
</svelte:element>
