<svelte:options runes={true} />

<script lang="ts">
	let {
		name = 'No property name provided',
		value = `No value provided for property ${name}`
	}: { name: string; value: string | number } = $props();
</script>

<h3 class="text-xl font-bold">{name}</h3>
<div class="spacer-sm"></div>
<slot>
	<p>{value || ''}</p>
</slot>
<div class="spacer"></div>

<style>
	.spacer {
		height: 2em;
	}
	.spacer-sm {
		height: 1em;
	}
</style>
