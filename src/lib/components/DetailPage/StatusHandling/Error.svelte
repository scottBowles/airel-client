<svelte:options runes={true} />

<script lang="ts">
	import { BasicProperty, LayoutBase } from '$lib/components/DetailPage';
	let { errors }: { errors: { message: string }[] } = $props();
</script>

<LayoutBase>
	<!-- NAME -->
	{#snippet nameSnippet()}
		<h1 class="text-3xl font-bold">Something went wrong</h1>
	{/snippet}

	{#snippet propertiesSnippet()}
		{#each errors as error, i (i + error.message)}
			<BasicProperty name="Error" value={error.message} />
		{/each}
	{/snippet}
</LayoutBase>
