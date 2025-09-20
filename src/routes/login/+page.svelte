<script lang="ts">
	import GoogleSSO from '$lib/components/GoogleSSO.svelte';
</script>

<div class="container mx-auto flex h-screen flex-col items-center justify-center">
	<h1 class="mb-4 text-center text-3xl font-bold sm:text-4xl">Welcome to Airel</h1>

	<GoogleSSO />
	<!-- {#each errors as error}
		<pre>{error}</pre>
	{/each} -->
</div>
