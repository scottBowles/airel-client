<script lang="ts">
	import { fragment, graphql, PlaceAddImageStore } from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import { somethingWentWrong } from '$lib/utils';
	import type { PageData } from './$houdini';
	import PlaceDetail from './PlaceDetail.svelte';
	import PlaceEdit from './PlaceEdit.svelte';

	const addImageMutation = new PlaceAddImageStore();

	export let data: PageData;

	$: ({ Place } = data);
	$: place = $Place.data?.place;

	$: lockedBySelfData = fragment(
		place,
		graphql(`
			fragment PlaceLockedBySelf on Place {
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

<StatusHandler creating="false" status="DONE" errors={''} value={place} entityName="place">
	{#if !place}
		<Loading />
	{:else if $lockedBySelfData?.lockedBySelf}
		<PlaceEdit {place} {onImageUpload} />
	{:else}
		<PlaceDetail {place} {onImageUpload} />
	{/if}
</StatusHandler>
