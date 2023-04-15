<script lang="ts">
	import { fragment, graphql, ItemAddImageStore } from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import { somethingWentWrong } from '$lib/utils';
	import type { PageData } from './$houdini';
	import ItemDetail from './ItemDetail.svelte';
	import ItemEdit from './ItemEdit.svelte';

	const addImageMutation = new ItemAddImageStore();

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
</script>

<StatusHandler creating="false" status="DONE" errors={''} value={item} entityName="item">
	{#if !item}
		<Loading />
	{:else if $lockedBySelfData?.lockedBySelf}
		<ItemEdit {item} {onImageUpload} />
	{:else}
		<ItemDetail {item} {onImageUpload} />
	{/if}
</StatusHandler>
