<script lang="ts">
	import { browser } from '$app/environment';
	import { AssociationNamesAndIdsStore } from '$houdini';
	import RelatedEntityMultiSelectBase from './RelatedEntityMultiSelectBase.svelte';

	const associationNamesAndIdsQuery = new AssociationNamesAndIdsStore();
	$: browser && associationNamesAndIdsQuery.fetch();

	let initialValues: string[] = [];
	export { initialValues as initialAssociationIds };
	export let id = `association-select`;

	$: optionNamesAndIdNodes = $associationNamesAndIdsQuery.data?.associations.edges;
	$: ({ fetching } = $associationNamesAndIdsQuery);
</script>

<RelatedEntityMultiSelectBase
	{id}
	inputGroupName="associations"
	{fetching}
	{optionNamesAndIdNodes}
	{initialValues}
/>
