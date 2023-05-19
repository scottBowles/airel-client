<script lang="ts">
	import { browser } from '$app/environment';
	import { ArtifactNamesAndIdsStore } from '$houdini';
	import RelatedEntityMultiSelectBase from './RelatedEntityMultiSelectBase.svelte';

	const artifactNamesAndIdsQuery = new ArtifactNamesAndIdsStore();
	$: browser && artifactNamesAndIdsQuery.fetch();

	let initialValues: string[] = [];
	export { initialValues as initialArtifactIds };
	export let id = `artifact-select`;
	export let inputGroupName = 'artifacts';
	export let entityDisplayName = inputGroupName;

	$: optionNamesAndIdNodes = $artifactNamesAndIdsQuery.data?.artifacts.edges;
	$: ({ fetching } = $artifactNamesAndIdsQuery);
</script>

<RelatedEntityMultiSelectBase
	{id}
	{inputGroupName}
	{entityDisplayName}
	{fetching}
	{optionNamesAndIdNodes}
	{initialValues}
/>
