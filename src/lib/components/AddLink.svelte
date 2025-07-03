<svelte:options runes={true} />

<script lang="ts">
	let { href }: { href: string } = $props();
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
