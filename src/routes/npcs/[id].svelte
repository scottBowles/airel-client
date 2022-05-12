<script context="module" lang="ts">
	import { page } from '$app/stores';
	import {
		KQL_NpcAddImage,
		KQL_NpcById,
		KQL_NpcLock,
		KQL_NpcPatch
	} from '$lib/graphql/_kitql/graphqlStores';
	import { somethingWentWrong } from '$lib/utils';
	import { KitQLInfo } from '@kitql/all-in';
	import DetailBase from './_DetailBase.svelte';

	export const load = async ({ fetch, params }) => {
		await KQL_NpcById.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script>
	const { id } = $page.params;
	const variables = { id }; // for requests

	$: ({ status, errors, data } = $KQL_NpcById);
	$: ({ npc } = data || {});

	function patchStore(patch) {
		const update = { npc: { ...npc, ...patch } };
		KQL_NpcById.patch(update, variables);
	}

	function refreshFromNetwork() {
		KQL_NpcById.query({ variables, settings: { policy: 'cache-and-network' } });
	}

	async function onEditClick() {
		const lockRes = await KQL_NpcLock.mutate({ variables });
		if (lockRes.errors) {
			refreshFromNetwork();
			somethingWentWrong(lockRes.errors[0].message);
			return;
		}
		patchStore(lockRes.data.npcLock.npc);
		return;
	}

	async function onFormSubmit(e) {
		const form = e.target;
		const formData = new FormData(form);
		const patch = {};
		formData.forEach((value, key) => {
			patch[key] = value;
		});

		const { data, errors: resErrors } = await KQL_NpcPatch.mutate({
			variables: { id, ...patch }
		});

		if (resErrors) {
			somethingWentWrong(resErrors[0].message);
		}
		const { npc: updatedNpc, errors, ok } = data.npcPatch;
		if (ok) {
			patchStore(updatedNpc);
		}
		if (errors) {
			somethingWentWrong(errors);
		}
	}

	async function onImageUpload(error, result) {
		if (error) {
			somethingWentWrong(JSON.stringify(error));
			return;
		}
		if (result?.event === 'success') {
			const { data, errors: resErrors } = await KQL_NpcAddImage.mutate({
				variables: {
					id,
					imageId: result.info.public_id
				}
			});
			if (resErrors) {
				somethingWentWrong(resErrors[0].message);
			}
			const { npc, errors, ok } = data.npcAddImage;
			if (ok) {
				patchStore(npc);
			}
			if (errors) {
				somethingWentWrong(errors);
			}
		}
	}
</script>

<DetailBase {npc} {status} {errors} {onEditClick} {onFormSubmit} {onImageUpload} />
<!-- <KitQLInfo store={KQL_NpcById} /> -->
