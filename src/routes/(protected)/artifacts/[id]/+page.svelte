<script lang="ts">
	import {
		fragment,
		graphql,
		ArtifactAddImageStore,
		AddEntityLogStore,
		RemoveEntityLogStore
	} from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import { somethingWentWrong } from '$lib/utils';
	import type { PageData } from './$houdini';
	import ArtifactDetail from './ArtifactDetail.svelte';
	import ArtifactEdit from './ArtifactEdit.svelte';

	const addImageMutation = new ArtifactAddImageStore();
	const addLogMutation = new AddEntityLogStore();
	const removeLogMutation = new RemoveEntityLogStore();

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

	const onImageUpload = async (error: any, result: any) => {
		if (error) return somethingWentWrong(error.message);

		const imageUploaded = result?.event === 'success';
		if (!imageUploaded) return;

		const id = $lockedBySelfData?.id;
		const imageId = result.info.public_id;
		if (!id) return somethingWentWrong('Could not find object id');

		const res = await addImageMutation.mutate({ id, imageId });

		if (res.errors) somethingWentWrong(res.errors[0].message);
	};

	const onLogAddition = async (logUrl: string) => {
		const entityId = $lockedBySelfData?.id;
		if (!entityId) return somethingWentWrong('Could not find object id');

		const res = await addLogMutation.mutate({ entityId, logUrl });

		if (res.errors) somethingWentWrong(res.errors[0].message);
	};

	const onLogRemoval = async (logId: string) => {
		const entityId = $lockedBySelfData?.id;
		if (!entityId) return somethingWentWrong('Could not find object id');

		const res = await removeLogMutation.mutate({ entityId, logId });

		if (res.errors) somethingWentWrong(res.errors[0].message);
	};
</script>

<StatusHandler creating="false" status="DONE" errors={''} value={artifact} entityName="artifact">
	{#if !artifact}
		<Loading />
	{:else if $lockedBySelfData?.lockedBySelf}
		<ArtifactEdit {artifact} {onImageUpload} {onLogAddition} {onLogRemoval} />
	{:else}
		<ArtifactDetail {artifact} {onImageUpload} {onLogAddition} {onLogRemoval} />
	{/if}
</StatusHandler>
