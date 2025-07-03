<script lang="ts">
	import { CharacterNamesAndIdsStore } from '$houdini';
	import { onMount } from 'svelte';
	import RelatedEntityMultiSelectBase from './RelatedEntityMultiSelectBase.svelte';

	const characterNamesAndIdsQuery = new CharacterNamesAndIdsStore();
	onMount(() => characterNamesAndIdsQuery.fetch());

	interface Props {
		ids?: string[];
		id?: string;
		inputGroupName?: string;
		entityDisplayName?: string;
	}

	let {
		ids = $bindable([]),
		id = `character-select`,
		inputGroupName = 'characters',
		entityDisplayName = inputGroupName
	}: Props = $props();

	let optionNamesAndIdNodes = $derived($characterNamesAndIdsQuery.data?.characters.edges);
	let { fetching } = $derived($characterNamesAndIdsQuery);
</script>

<RelatedEntityMultiSelectBase
	{id}
	{inputGroupName}
	{entityDisplayName}
	{fetching}
	{optionNamesAndIdNodes}
	bind:ids
/>
