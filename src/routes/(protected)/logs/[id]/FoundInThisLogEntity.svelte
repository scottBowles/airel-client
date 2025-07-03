<svelte:options runes={true} />

<script lang="ts">
	import { capitalize } from '$lib/utils';

	let {
		name,
		entities,
		getUrl = (entity) => {
			const entityName = name.toLowerCase();
			return `/${entityName}/${entity.id}`;
		}
	}: {
		name: string;
		entities: { id: string; name: string }[];
		getUrl?: (entity: { id: string; name: string }) => string;
	} = $props();
</script>

<div class="mb-3">
	<h3 class="mb-2">{capitalize(name)}</h3>
	<div class="flex flex-wrap gap-x-1 gap-y-1">
		{#if entities.length > 0}
			{#each entities as entity (entity.id)}
				<a href={getUrl(entity)} class="badge badge-neutral hover:text-accent p-3 hover:underline"
					>{entity.name}</a
				>
			{/each}
		{:else}
			<span class="font-extralight text-slate-500"> No {name.toLowerCase()} selected </span>
		{/if}
	</div>
</div>
