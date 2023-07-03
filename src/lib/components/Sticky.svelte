<!-- https://css-tricks.com/how-to-detect-when-a-sticky-element-gets-pinned/ -->

<script lang="ts">
	import sticky from '$lib/actions/sticky';

	export let tag = 'div';

	let isStuck = false;

	function handleStuck(e: CustomEvent<{ isStuck: boolean }>) {
		isStuck = e.detail.isStuck;
	}
</script>

<svelte:element this={tag}>
	<!-- the `-top-px` style is needed for this to work -->
	<div use:sticky on:stuck={handleStuck} class="sticky z-10 -top-px">
		<slot name="sticky" {isStuck} />
	</div>

	<slot name="content" />
</svelte:element>
