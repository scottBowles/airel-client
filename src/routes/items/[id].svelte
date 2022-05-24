<script context="module">
	import { page } from '$app/stores';
	import AddLink from '$lib/components/AddLink.svelte';
	import {
		KQL_ItemAddImage,
		KQL_ItemById,
		KQL_ItemLock,
		KQL_ItemPatch
	} from '$lib/graphql/_kitql/graphqlStores';
	import { somethingWentWrong } from '$lib/utils';
	import { KitQLInfo } from '@kitql/all-in';
	import { writable } from 'svelte/store';
	import DetailBase from './_DetailBase.svelte';
	import { emptyItem } from './_utils';

	export const load = async ({ fetch, params }) => {
		await KQL_ItemById.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script>
	const { id } = $page.params;
	const variables = { id }; // for requests

	$: ({ status, errors, data } = $KQL_ItemById);

	const item = writable(emptyItem);
	$: {
		if (data?.item) {
			$item = data.item;
		}
	}

	function patchStore(patch) {
		const update = { item: { ...$item, ...patch } };
		KQL_ItemById.patch(update, variables);
	}

	function refreshFromNetwork() {
		KQL_ItemById.query({ variables, settings: { policy: 'cache-and-network' } });
	}

	async function onEditClick() {
		const lockRes = await KQL_ItemLock.mutate({ variables });
		if (lockRes.errors) {
			refreshFromNetwork();
			somethingWentWrong(lockRes.errors[0].message);
			return;
		}
		patchStore(lockRes.data.itemLock.item);
		return;
	}

	async function onFormSubmit() {
		const patch = {
			name: $item.name,
			description: $item.description,
			markdownNotes: $item.markdownNotes,
			...($item.armor && { armor: { acBonus: $item.armor.acBonus } }),
			...($item.equipment && { equipment: { briefDescription: $item.equipment.briefDescription } }),
			...($item.weapon && { weapon: { attackBonus: $item.weapon.attackBonus } })
		};

		const { data, errors: resErrors } = await KQL_ItemPatch.mutate({ variables: { id, ...patch } });

		if (resErrors) {
			somethingWentWrong(resErrors[0].message);
			return;
		}

		const { item: updatedItem, errors, ok } = data.itemPatch;
		if (ok) patchStore(updatedItem);
		if (errors) somethingWentWrong(errors);
	}

	async function onImageUpload(error, result) {
		if (error) {
			somethingWentWrong(JSON.stringify(error));
			return;
		}
		if (result?.event === 'success') {
			const { data, errors: resErrors } = await KQL_ItemAddImage.mutate({
				variables: { id, imageId: result.info.public_id }
			});

			if (resErrors) {
				somethingWentWrong(resErrors[0].message);
				return;
			}

			const { item, errors, ok } = data.itemAddImage;
			if (ok) patchStore(item);
			if (errors) somethingWentWrong(errors);
		}
	}
</script>

<DetailBase {item} {status} {errors} {onEditClick} {onFormSubmit} {onImageUpload} />
<!-- <KitQLInfo store={KQL_ItemById} /> -->
