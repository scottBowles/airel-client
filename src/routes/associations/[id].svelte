<script context="module" lang="ts">
	import { page } from '$app/stores';
	import {
		KQL_AssociationAddImage,
		KQL_AssociationById,
		KQL_AssociationLock,
		KQL_AssociationPatch
	} from '$lib/graphql/_kitql/graphqlStores';
	import { somethingWentWrong } from '$lib/utils';
	import { KitQLInfo } from '@kitql/all-in';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import DetailBase from './_DetailBase.svelte';
	import { emptyAssociation } from './_utils';

	export const load = async ({ fetch, params }) => {
		await KQL_AssociationById.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script>
	const { id } = $page.params;
	const variables = { id }; // for requests

	$: ({ status, errors, data } = $KQL_AssociationById);
	$: ({ association } = data || {});

	const form = writable({ ...emptyAssociation });
	onMount(setForm);

	function setForm() {
		if (association) {
			$form = {
				name: association.name,
				description: association.description,
				markdownNotes: association.markdownNotes,
				npcs: association.npcs.edges.map(({ node }) => node.id),
				imageIds: association.imageIds
			};
		}
	}

	function patchStore(patch) {
		const update = { association: { ...association, ...patch } };
		KQL_AssociationById.patch(update, variables);
	}

	function refreshFromNetwork() {
		KQL_AssociationById.query({ variables, settings: { policy: 'cache-and-network' } });
	}

	async function onEditClick() {
		const lockRes = await KQL_AssociationLock.mutate({ variables });
		if (lockRes.errors) {
			refreshFromNetwork();
			somethingWentWrong(lockRes.errors[0].message);
			return;
		}
		patchStore(lockRes.data.associationLock.association);
		setForm();
		return;
	}

	async function onFormSubmit() {
		const patch = {
			name: $form.name,
			description: $form.description,
			markdownNotes: $form.markdownNotes,
			npcs: $form.npcs || []
		};
		const { data, errors: resErrors } = await KQL_AssociationPatch.mutate({
			variables: { id, ...patch }
		});

		if (resErrors) somethingWentWrong(resErrors[0].message);

		const { association: updatedAssociation, errors, ok } = data.associationPatch;
		if (ok) patchStore(updatedAssociation);
		if (errors) somethingWentWrong(errors);
	}

	async function onImageUpload(error, result) {
		if (error) {
			somethingWentWrong(error);
			return;
		}
		if (result?.event === 'success') {
			const { data, errors: resErrors } = await KQL_AssociationAddImage.mutate({
				variables: { id, imageId: result.info.public_id }
			});
			if (resErrors) {
				somethingWentWrong(resErrors[0].message);
				return;
			}
			const { association, errors, ok } = data.associationAddImage;
			if (ok) patchStore(association);
			if (ok && association.lockedBySelf) $form.imageIds = association.imageIds;
			if (errors) somethingWentWrong(errors);
		}
	}
</script>

<DetailBase {association} {form} {status} {errors} {onEditClick} {onFormSubmit} {onImageUpload} />
<!-- <KitQLInfo store={KQL_AssociationById} /> -->
