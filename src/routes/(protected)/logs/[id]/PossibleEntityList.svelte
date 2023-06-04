<script lang="ts">
	import { capitalize } from '$lib/utils';
	import { entityPlural, type EntityType } from '$lib/constants';
	import AddEntityOrAliasBtn from './AddEntityOrAliasBtn.svelte';

	export let suggestedEntityType: EntityType;
	export let entityNames: string[];
	export let updateFoundEntities: (type: EntityType, newEntity: any) => void;
	export let updateLogEntitiesInForm: (id: string) => void;

	$: title = capitalize(entityPlural(suggestedEntityType));
</script>

<div>
	<div class="text-lg font-bold">{title}</div>

	{#each entityNames as entityName (entityName)}
		<div>
			<AddEntityOrAliasBtn
				{entityName}
				{suggestedEntityType}
				{updateFoundEntities}
				{updateLogEntitiesInForm}
			/>
			{entityName}
		</div>
	{/each}
</div>
