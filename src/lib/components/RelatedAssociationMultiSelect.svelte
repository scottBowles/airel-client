<script lang="ts">
	import { browser } from '$app/environment';
	import { AssociationNamesAndIdsStore } from '$houdini';
	import RelatedEntityMultiSelectBase from './RelatedEntityMultiSelectBase.svelte';

	const associationNamesAndIdsQuery = new AssociationNamesAndIdsStore();
	$: browser && associationNamesAndIdsQuery.fetch();

	export let ids: string[] = [];
	export let id = `association-select`;
	export let inputGroupName = 'associations';

	$: optionNamesAndIdNodes = $associationNamesAndIdsQuery.data?.associations.edges;
	$: ({ fetching } = $associationNamesAndIdsQuery);
</script>

<RelatedEntityMultiSelectBase {id} {inputGroupName} {fetching} {optionNamesAndIdNodes} bind:ids />
