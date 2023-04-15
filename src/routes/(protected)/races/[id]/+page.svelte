<script lang="ts">
	import { fragment, graphql, RaceAddImageStore } from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import { somethingWentWrong } from '$lib/utils';
	import type { PageData } from './$houdini';
	import RaceDetail from './RaceDetail.svelte';
	import RaceEdit from './RaceEdit.svelte';

	const addImageMutation = new RaceAddImageStore();

	export let data: PageData;

	$: ({ Race } = data);
	$: race = $Race.data?.race;

	$: lockedBySelfData = fragment(
		race,
		graphql(`
			fragment RaceLockedBySelf on Race {
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
</script>

<StatusHandler creating="false" status="DONE" errors={''} value={race} entityName="race">
	{#if !race}
		<Loading />
	{:else if $lockedBySelfData?.lockedBySelf}
		<RaceEdit {race} {onImageUpload} />
	{:else}
		<RaceDetail {race} {onImageUpload} />
	{/if}
</StatusHandler>
