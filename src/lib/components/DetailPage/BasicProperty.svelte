<svelte:options runes={true} />

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		name: string;
		value: string | number;
	}

	let {
		children,
		name = 'No property name provided',
		value = `No value provided for property ${name}`
	}: Props = $props();
</script>

<h3 class="font-heading text-xl font-bold">{name}</h3>

<div class="spacer-sm"></div>

{#if children}
	{@render children()}
{:else}
	<p class="font-content">{value || ''}</p>
{/if}

<div class="spacer"></div>

<style>
	.spacer {
		height: 2em;
	}
	.spacer-sm {
		height: 1em;
	}
</style>
