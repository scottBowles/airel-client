<script lang="ts">
	import { AssociationNamesAndIdsStore } from '$houdini';
	import { onMount } from 'svelte';
	import RelatedEntityMultiSelectBase from './RelatedEntityMultiSelectBase.svelte';

	const associationNamesAndIdsQuery = new AssociationNamesAndIdsStore();
	onMount(() => associationNamesAndIdsQuery.fetch());

	interface Props {
		ids?: string[];
		id?: string;
		inputGroupName?: string;
		entityDisplayName?: string;
	}

	let {
		ids = $bindable([]),
		id = `association-select`,
		inputGroupName = 'associations',
		entityDisplayName = inputGroupName
	}: Props = $props();

	let optionNamesAndIdNodes = $derived($associationNamesAndIdsQuery.data?.associations.edges);
	let { fetching } = $derived($associationNamesAndIdsQuery);
</script>

<RelatedEntityMultiSelectBase
	{id}
	{inputGroupName}
	{entityDisplayName}
	{fetching}
	{optionNamesAndIdNodes}
	bind:ids
/>
