<script lang="ts">
	import { browser } from '$app/environment';
	import { CharacterNamesAndIdsStore } from '$houdini';
	import RelatedEntityMultiSelectBase from './RelatedEntityMultiSelectBase.svelte';

	const characterNamesAndIdsQuery = new CharacterNamesAndIdsStore();
	$: browser && characterNamesAndIdsQuery.fetch();

	export let ids: string[] = [];
	export let id = `character-select`;
	export let inputGroupName = 'characters';
	export let entityDisplayName = inputGroupName;

	$: optionNamesAndIdNodes = $characterNamesAndIdsQuery.data?.characters.edges;
	$: ({ fetching } = $characterNamesAndIdsQuery);
</script>

<RelatedEntityMultiSelectBase
	{id}
	{inputGroupName}
	{entityDisplayName}
	{fetching}
	{optionNamesAndIdNodes}
	bind:ids
/>
