<script lang="ts">
	import { fragment, graphql } from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import type { PageData } from './$houdini';
	import ArtifactDetail from './ArtifactDetail.svelte';
	import ArtifactEdit from './ArtifactEdit.svelte';

	export let data: PageData;

	$: ({ Artifact } = data);
	$: artifact = $Artifact.data?.artifact;

	$: lockedBySelfData = fragment(
		artifact,
		graphql(`
			fragment ArtifactLockedBySelf on Artifact {
				id
				lockedBySelf
			}
		`)
	);
</script>

<StatusHandler entityName="artifact" queryResult={$Artifact}>
	{#if !artifact}
		<Loading />
	{:else if $lockedBySelfData?.lockedBySelf}
		<ArtifactEdit {artifact} />
	{:else}
		<ArtifactDetail {artifact} />
	{/if}
</StatusHandler>
