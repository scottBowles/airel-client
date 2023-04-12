<script lang="ts">
	import { fragment, graphql } from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import type { PageData } from './$houdini';
	import RaceDetail from './RaceDetail.svelte';
	import RaceEdit from './RaceEdit.svelte';

	export let data: PageData;

	$: ({ Race } = data);
	$: race = $Race.data?.race;

	$: lockedBySelf = fragment(
		race,
		graphql(`
			fragment RaceLockedBySelf on Race {
				lockedBySelf
			}
		`)
	);
</script>

<StatusHandler creating="false" status="DONE" errors={''} value={race} entityName="race">
	{#if !race}
		<Loading />
	{:else if $lockedBySelf?.lockedBySelf}
		<RaceEdit {race} />
	{:else}
		<RaceDetail {race} />
	{/if}
</StatusHandler>
