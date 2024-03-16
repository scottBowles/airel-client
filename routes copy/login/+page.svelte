<script lang="ts">
	import GoogleSSO from '$lib/components/GoogleSSO.svelte';
</script>

<div class="container h-screen mx-auto flex flex-col items-center justify-center">
	<h1 class="text-3xl sm:text-4xl font-bold text-center mb-4">Welcome to Airel</h1>

	<GoogleSSO />
	<!-- {#each errors as error}
		<pre>{error}</pre>
	{/each} -->
</div>
