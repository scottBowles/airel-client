<script lang="ts">
	import { fragment, graphql } from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import type { PageData } from './$houdini';
	import CharacterDetail from './CharacterDetail.svelte';
	import CharacterEdit from './CharacterEdit.svelte';

	export let data: PageData;

	$: ({ Character } = data);
	$: character = $Character.data?.character;

	$: lockedBySelfData = fragment(
		character,
		graphql(`
			fragment CharacterLockedBySelf on Character {
				id
				lockedBySelf
			}
		`)
	);
</script>

<StatusHandler creating="false" status="DONE" errors={''} value={character} entityName="character">
	{#if !character}
		<Loading />
	{:else if $lockedBySelfData?.lockedBySelf}
		<CharacterEdit {character} />
	{:else}
		<CharacterDetail {character} />
	{/if}
</StatusHandler>
