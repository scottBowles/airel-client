<svelte:options runes={true} />

<script lang="ts">
	import { fragment, graphql } from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import type { PageData } from './$houdini';
	import CharacterDetail from './CharacterDetail.svelte';
	import CharacterEdit from './CharacterEdit.svelte';

	let { data } = $props<{ data: PageData }>();

	let { Character } = $derived(data);
	let character = $derived($Character.data?.character);

	let lockedBySelfData = $derived(
		fragment(
			character,
			graphql(`
				fragment CharacterLockedBySelf on Character {
					id
					lockedBySelf
				}
			`)
		)
	);
</script>

<StatusHandler entityName="character" queryResult={$Character}>
	{#if !character}
		<Loading />
	{:else if $lockedBySelfData?.lockedBySelf}
		<CharacterEdit {character} />
	{:else}
		<CharacterDetail {character} />
	{/if}
</StatusHandler>
