<script lang="ts">
	import { fragment, graphql } from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import type { PageData } from './$houdini';
	import ArtifactDetail from './ArtifactDetail.svelte';
	import ArtifactEdit from './ArtifactEdit.svelte';

	export let data: PageData;

	$: ({ Artifact } = data);
	$: artifact = $Artifact.data?.artifact;

	$: lockedBySelf = fragment(
		artifact,
		graphql(`
			fragment ArtifactLockedBySelf on Artifact {
				lockedBySelf
			}
		`)
	);
</script>

<StatusHandler creating="false" status="DONE" errors={''} value={artifact} entityName="artifact">
	{#if !artifact}
		<Loading />
	{:else if $lockedBySelf?.lockedBySelf}
		<ArtifactEdit {artifact} />
	{:else}
		<ArtifactDetail {artifact} />
	{/if}
</StatusHandler>
