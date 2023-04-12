<script lang="ts">
	import { fragment, graphql, AssociationAddImageStore } from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import { somethingWentWrong } from '$lib/utils';
	import type { PageData } from './$houdini';
	import AssociationDetail from './AssociationDetail.svelte';
	import AssociationEdit from './AssociationEdit.svelte';

	const addImageMutation = new AssociationAddImageStore();

	export let data: PageData;

	$: ({ Association } = data);
	$: association = $Association.data?.association;

	$: lockedBySelfData = fragment(
		association,
		graphql(`
			fragment AssociationLockedBySelf on Association {
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

<StatusHandler
	creating="false"
	status="DONE"
	errors={''}
	value={association}
	entityName="association"
>
	{#if !association}
		<Loading />
	{:else if $lockedBySelfData?.lockedBySelf}
		<AssociationEdit {association} {onImageUpload} />
	{:else}
		<AssociationDetail {association} {onImageUpload} />
	{/if}
</StatusHandler>
