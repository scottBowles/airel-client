<script lang="ts">
	export let name = 'No property name provided';
	export let value: string | number = `No value provided for property ${name}`;
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
