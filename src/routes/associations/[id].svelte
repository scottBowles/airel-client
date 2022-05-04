<script context="module" lang="ts">
	import {
		KQL_AssociationById,
		KQL_AssociationLock,
		KQL_AssociationPatch,
		KQL_AssociationAddImage
	} from '$lib/graphql/_kitql/graphqlStores';
	import { KitQLInfo } from '@kitql/all-in';

	export const load = async ({ fetch, params }) => {
		await KQL_AssociationById.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script>
	import { Text } from '@kahi-ui/framework';
	import { page } from '$app/stores';
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import { LockFailedError } from '$lib/errors';
	import BasicProperty from '$lib/components/DetailPage/BasicProperty.svelte';

	const { id } = $page.params;
	const variables = { id }; // for requests

	$: ({ status, errors, data } = $KQL_AssociationById);
	$: ({ association } = data || {});
	$: ({ name, imageIds, description, markdownNotes, lockUser, lockedBySelf } = association || {});

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
			// notify error rather than throwing error
			// return;
			throw new LockFailedError(lockRes.errors[0].message);
		}
		patchStore(lockRes.data.associationLock.association);
		return;
	}

	async function onFormSubmit(e) {
		const form = e.target;
		const formData = new FormData(form);
		const patch = {};
		formData.forEach((value, key) => {
			patch[key] = value;
		});
		console.log({ patch });

		const { data, errors: resErrors } = await KQL_AssociationPatch.mutate({
			variables: { id, ...patch }
		});

		if (resErrors) {
			// handle resErrors
		}
		const { association: updatedAssociation, errors, ok } = data.associationPatch;
		if (ok) {
			patchStore(updatedAssociation);
		}
		// handle errors
	}

	async function onImageUpload(error, result) {
		if (error) {
			// handle error
			// console.log('handleImageUpload', { error });
		}
		if (result?.event === 'success') {
			const { data, errors: resErrors } = await KQL_AssociationAddImage.mutate({
				variables: {
					id,
					imageId: result.info.public_id
				}
			});
			if (resErrors) {
				// handle resErrors
			}
			const { association, errors, ok } = data.associationAddImage;
			if (ok) {
				// console.log({ association });
				patchStore(association);
				// console.log('post patch', $KQL_AssociationById);
			}
		}
	}
</script>

<StatusHandler {status} {errors} value={association} entityName="association">
	<Layout
		{name}
		{imageIds}
		{markdownNotes}
		{lockUser}
		{lockedBySelf}
		properties={{
			Description: description
		}}
		{onEditClick}
		{onFormSubmit}
		{onImageUpload}
	>
		<svelte:fragment slot="properties">
			<BasicProperty name="Description">
				<Text>
					{#if association.lockedBySelf}
						<input name="description" value={association.description} />
					{:else}
						{association.description}
					{/if}
				</Text>
			</BasicProperty>
		</svelte:fragment>
	</Layout>
</StatusHandler>
<!-- <KitQLInfo store={KQL_AssociationById} /> -->
