<svelte:options runes={true} />

<script lang="ts">
	let { href } = $props<{ href: string }>();
</script>

<a {href}>+ Add</a>

<style>
	a {
		color: #908149;
		font-weight: bold;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
