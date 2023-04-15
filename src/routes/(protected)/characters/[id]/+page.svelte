<script lang="ts">
	import {
		fragment,
		graphql,
		CharacterAddImageStore,
		AddEntityLogStore,
		RemoveEntityLogStore
	} from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import { somethingWentWrong } from '$lib/utils';
	import type { PageData } from './$houdini';
	import CharacterDetail from './CharacterDetail.svelte';
	import CharacterEdit from './CharacterEdit.svelte';

	const addImageMutation = new CharacterAddImageStore();
	const addLogMutation = new AddEntityLogStore();
	const removeLogMutation = new RemoveEntityLogStore();

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

<StatusHandler creating="false" status="DONE" errors={''} value={character} entityName="character">
	{#if !character}
		<Loading />
	{:else if $lockedBySelfData?.lockedBySelf}
		<CharacterEdit {character} {onImageUpload} {onLogAddition} {onLogRemoval} />
	{:else}
		<CharacterDetail {character} {onImageUpload} {onLogAddition} {onLogRemoval} />
	{/if}
</StatusHandler>
