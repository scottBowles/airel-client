<script lang="ts">
	import { BasicProperty, Layout } from '$lib/components/DetailPage';
	export let errors: { message: string }[] = [];
</script>

<Layout name="Something went wrong">
	<svelte:fragment slot="properties">
		{#each errors as error}
			<BasicProperty name="Error" value={error.message} />
		{/each}
	</svelte:fragment>
</Layout>
