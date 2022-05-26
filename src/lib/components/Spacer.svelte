<script lang="ts">
	export let xs = false;
	export let sm = false;
	export let md = false;
	export let lg = false;
	export let xl = false;

	const sizes: [boolean, string][] = [
		[xs, 'xs'],
		[sm, 'sm'],
		[md, 'md'],
		[lg, 'lg'],
		[xl, 'xl']
	];

	$: size = sizes.find(([size, name]) => size)?.[1] || 'md';
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
