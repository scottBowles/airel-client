<script lang="ts">
	import {
		AddEntityLogStore,
		fragment,
		graphql,
		ItemAddImageStore,
		RemoveEntityLogStore
	} from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import { somethingWentWrong } from '$lib/utils';
	import type { PageData } from './$houdini';
	import ItemDetail from './ItemDetail.svelte';
	import ItemEdit from './ItemEdit.svelte';

	const addImageMutation = new ItemAddImageStore();
	const addLogMutation = new AddEntityLogStore();
	const removeLogMutation = new RemoveEntityLogStore();

	export let data: PageData;

	$: ({ Item } = data);
	$: item = $Item.data?.item;

	$: lockedBySelfData = fragment(
		item,
		graphql(`
			fragment ItemLockedBySelf on Item {
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

<StatusHandler creating="false" status="DONE" errors={''} value={item} entityName="item">
	{#if !item}
		<Loading />
	{:else if $lockedBySelfData?.lockedBySelf}
		<ItemEdit {item} {onImageUpload} {onLogAddition} {onLogRemoval} />
	{:else}
		<ItemDetail {item} {onImageUpload} {onLogAddition} {onLogRemoval} />
	{/if}
</StatusHandler>
