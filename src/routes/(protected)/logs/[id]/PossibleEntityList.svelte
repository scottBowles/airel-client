<script lang="ts">
	import { capitalize } from '$lib/utils';
	import { entityPlural, type EntityType } from '$lib/constants';
	import AddEntityOrAliasBtn from './AddEntityOrAliasBtn.svelte';

	interface Props {
		suggestedEntityType: EntityType;
		entityNames: string[];
		updateFoundEntities: (type: EntityType, newEntity: any) => void;
		updateLogEntitiesInForm: (id: string) => void;
	}

	let {
		suggestedEntityType,
		entityNames,
		updateFoundEntities,
		updateLogEntitiesInForm
	}: Props = $props();

	let title = $derived(capitalize(entityPlural(suggestedEntityType)));
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
