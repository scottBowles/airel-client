<script lang="ts">
	import { capitalize, fromGlobalId } from '$lib/utils';

	export let name: string;
	export let entities: { id: string; name: string }[];
	export let getUrl: (entity: { id: string; name: string }) => string = (entity) => {
		const entityName = entity.name.toLowerCase();
		const id = fromGlobalId(entity.id).id;
		return `/${entityName}/${id}`;
	};
</script>

<div class="mb-3">
	<h3 class="mb-2">{capitalize(name)}</h3>
	<div class="flex flex-wrap gap-x-1 gap-y-1">
		{#if entities.length > 0}
			{#each entities as entity (entity.id)}
				<a href={getUrl(entity)} class="badge hover:underline hover:text-accent p-3"
					>{entity.name}</a
				>
			{/each}
		{:else}
			<span class="text-slate-500 font-extralight"> No {name.toLowerCase()} selected </span>
		{/if}
	</div>
</div>
