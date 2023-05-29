<script lang="ts">
	import { capitalize } from '$lib/utils';
	import AddAliasBtn from './AddAliasBtn.svelte';
	import AddEntityBtn from './AddEntityBtn.svelte';
	import { entityPlural, type EntityType } from '$lib/constants';

	export let suggestedEntityType: EntityType;
	export let entityNames: string[];
	export let updateFoundEntities: (type: EntityType, newEntity: any) => void;

	$: title = capitalize(entityPlural(suggestedEntityType));
</script>

<div>
	<div class="text-lg font-bold">{title}</div>

	{#each entityNames as entityName (entityName)}
		<div>
			<AddAliasBtn {entityName} {suggestedEntityType} {updateFoundEntities} />
			<AddEntityBtn {entityName} {suggestedEntityType} />
			{entityName}
		</div>
	{/each}
</div>
