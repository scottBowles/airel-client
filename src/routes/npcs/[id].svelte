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
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import DetailBase from './_DetailBase.svelte';
	import { emptyNpc } from './_utils';

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

	const form = writable({ ...emptyNpc });

	onMount(setForm);

	function setForm() {
		if (npc) {
			$form = {
				name: npc.name,
				description: npc.description,
				markdownNotes: npc.markdownNotes,
				associations: npc.associations.edges.map(({ node }) => node.id),
				imageIds: npc.imageIds,
				race: npc.race?.id || ''
			};
		}
	}

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
		setForm();
		return;
	}

	async function onFormSubmit() {
		const patch = {
			name: $form.name,
			description: $form.description,
			markdownNotes: $form.markdownNotes,
			associations: $form.associations || [],
			race: $form.race
		};

		const { data, errors: resErrors } = await KQL_NpcPatch.mutate({
			variables: { id, ...patch }
		});

		if (resErrors) {
			somethingWentWrong(resErrors[0].message);
			return;
		}

		const { npc: updatedNpc, errors, ok } = data.npcPatch;
		if (ok) patchStore(updatedNpc);
		if (errors) somethingWentWrong(errors);
	}

	async function onImageUpload(error, result) {
		if (error) {
			somethingWentWrong(JSON.stringify(error));
			return;
		}
		if (result?.event === 'success') {
			const { data, errors: resErrors } = await KQL_NpcAddImage.mutate({
				variables: { id, imageId: result.info.public_id }
			});
			if (resErrors) {
				somethingWentWrong(resErrors[0].message);
				return;
			}

			const { npc, errors, ok } = data.npcAddImage;
			if (ok) patchStore(npc);
			if (ok && npc.lockedBySelf) $form.imageIds = npc.imageIds;
			if (errors) somethingWentWrong(errors);
		}
	}
</script>

<DetailBase {npc} {form} {status} {errors} {onEditClick} {onFormSubmit} {onImageUpload} />
<!-- <KitQLInfo store={KQL_NpcById} /> -->
