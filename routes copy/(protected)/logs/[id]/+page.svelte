<script lang="ts">
	import { fragment, graphql } from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import type { PageData } from './$houdini';
	import LogDetail from './LogDetail.svelte';
	import LogEdit from './LogEdit.svelte';

	export let data: PageData;
	$: ({ GameLog } = data);
	$: log = $GameLog.data?.gameLog;

	$: lockedBySelfData = fragment(
		log,
		graphql(`
			fragment LogLockedBySelf on GameLog {
				id
				lockedBySelf
			}
		`)
	);
</script>

<StatusHandler entityName="log" queryResult={$GameLog}>
	{#if !log}
		<Loading />
	{:else if $lockedBySelfData?.lockedBySelf}
		<LogEdit {log} />
	{:else}
		<LogDetail {log} />
	{/if}
</StatusHandler>
