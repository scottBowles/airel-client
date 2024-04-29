<svelte:options runes={true} />

<script lang="ts">
	import { BasicProperty, LayoutBase } from '$lib/components/DetailPage';
	let { errors }: { errors: { message: string }[] } = $props();
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
