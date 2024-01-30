<svelte:options runes={true} />

<script lang="ts">
	let { name = 'No property name provided', value = `No value provided for property ${name}` } =
		$props<{
			name: string;
			value: string | number;
		}>();
</script>

<h3 class="text-xl font-bold">{name}</h3>
<div class="spacer-sm" />
<slot>
	<p>{value || ''}</p>
</slot>
<div class="spacer" />

<style>
	.spacer {
		height: 2em;
	}
	.spacer-sm {
		height: 1em;
	}
</style>
