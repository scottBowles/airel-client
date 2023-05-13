<script lang="ts">
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import type { PageData } from './$houdini';
	import LogDetail from './LogDetail.svelte';

	export let data: PageData;
	$: ({ GameLog } = data);
	$: log = $GameLog.data?.gameLog;
</script>

<StatusHandler entityName="log" queryResult={$GameLog}>
	{#if !log}
		<Loading />
		<!-- {:else if $lockedBySelfData?.lockedBySelf}
		<ArtifactEdit {artifact} /> -->
	{:else}
		<LogDetail {log} />
	{/if}
</StatusHandler>
