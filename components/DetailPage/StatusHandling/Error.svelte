<script lang="ts">
	import { BasicProperty, LayoutBase } from '$lib/components/DetailPage';
	export let errors: { message: string }[] = [];
</script>

<LayoutBase>
	<!-- NAME -->
	<h1 slot="name" class="text-3xl font-bold">Something went wrong</h1>

	<svelte:fragment slot="properties">
		{#each errors as error}
			<BasicProperty name="Error" value={error.message} />
		{/each}
	</svelte:fragment>
</LayoutBase>
