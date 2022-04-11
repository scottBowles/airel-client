<script>
	import { Layout, BasicProperty } from '$lib/components/DetailPage';
	export let errors;
</script>

<Layout name="Something went wrong">
	<svelte:fragment slot="properties">
		{#each errors as error}
			<BasicProperty name="Error" value={error.message} />
		{/each}
	</svelte:fragment>
</Layout>
