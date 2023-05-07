<script lang="ts">
	import { browser } from '$app/environment';
	import { CharacterNamesAndIdsStore } from '$houdini';
	import RelatedEntityMultiSelectBase from './RelatedEntityMultiSelectBase.svelte';

	const characterNamesAndIdsQuery = new CharacterNamesAndIdsStore();
	$: browser && characterNamesAndIdsQuery.fetch();

	let initialValues: string[] = [];
	export { initialValues as initialCharacterIds };
	export let id = `character-select`;
	export let entityDisplayName: string | undefined;

	$: optionNamesAndIdNodes = $characterNamesAndIdsQuery.data?.characters.edges;
	$: ({ fetching } = $characterNamesAndIdsQuery);
</script>

<RelatedEntityMultiSelectBase
	{id}
	inputGroupName="characters"
	{entityDisplayName}
	{fetching}
	{optionNamesAndIdNodes}
	{initialValues}
/>
