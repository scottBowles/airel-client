<script lang="ts">
	import { ArtifactNamesAndIdsStore } from '$houdini';
	import { onMount } from 'svelte';
	import RelatedEntityMultiSelectBase from './RelatedEntityMultiSelectBase.svelte';

	const artifactNamesAndIdsQuery = new ArtifactNamesAndIdsStore();
	onMount(() => artifactNamesAndIdsQuery.fetch());

	interface Props {
		ids?: string[];
		id?: string;
		inputGroupName?: string;
		entityDisplayName?: string;
	}

	let {
		ids = $bindable([]),
		id = `artifact-select`,
		inputGroupName = 'artifacts',
		entityDisplayName = inputGroupName
	}: Props = $props();

	let optionNamesAndIdNodes = $derived($artifactNamesAndIdsQuery.data?.artifacts.edges);
	let { fetching } = $derived($artifactNamesAndIdsQuery);
</script>

<RelatedEntityMultiSelectBase
	{id}
	{inputGroupName}
	{entityDisplayName}
	{fetching}
	{optionNamesAndIdNodes}
	bind:ids
/>
