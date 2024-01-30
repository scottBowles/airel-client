<svelte:options runes={true} />

<script lang="ts">
	let { xs = false, sm = false, md = false, lg = false, xl = false } = $props();

	const sizes: [boolean, string][] = [
		[xs, 'xs'],
		[sm, 'sm'],
		[md, 'md'],
		[lg, 'lg'],
		[xl, 'xl']
	];

	let size = $derived(sizes.find(([size, name]) => size)?.[1] || 'md');
</script>

<div class={size} />

<style>
	.xs {
		height: 0.5rem;
	}

	.sm {
		height: 0.75rem;
	}

	.md {
		height: 1rem;
	}

	.lg {
		height: 1.5rem;
	}

	.xl {
		height: 2rem;
	}
</style>
