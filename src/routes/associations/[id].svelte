<script context="module" lang="ts">
	import {
		KQL_AssociationById,
		KQL_AssociationLock,
		KQL_AssociationPatch
	} from '$lib/graphql/_kitql/graphqlStores';
	import { KitQLInfo } from '@kitql/all-in';

	export const load = async ({ fetch, params }) => {
		await KQL_AssociationById.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script>
	import { Container, Heading, Text } from '@kahi-ui/framework';
	import { page } from '$app/stores';
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import { LockFailedError } from '$lib/errors';
	import EditableMarkdown from '$lib/components/EditableMarkdown.svelte';
	import BasicProperty from '$lib/components/DetailPage/BasicProperty.svelte';

	const { id } = $page.params;
	const variables = { id }; // for requests

	$: ({ status, errors, data } = $KQL_AssociationById);
	$: ({ association } = data || {});
	$: ({ lockUser, lockedBySelf } = association);
	$: console.log({ data });
	$: console.log('asdf', Object.values(data)[0]);

	let { markdownNotes } = association || {};

	function patchAssociationStore(patch) {
		const update = { association: { ...association, ...patch } };
		KQL_AssociationById.patch(update, variables);
	}

	function refreshAssociationFromNetwork() {
		KQL_AssociationById.query({ variables, settings: { policy: 'cache-and-network' } });
	}

	async function handleEditClick() {
		console.log('handleEditClick');
		const lockRes = await KQL_AssociationLock.mutate({ variables });
		if (lockRes.errors) {
			refreshAssociationFromNetwork();
			throw new LockFailedError(lockRes.errors[0].message);
		}
		patchAssociationStore(lockRes.data.associationLock.association);
		return;
	}

	async function handleFormSubmit(e) {
		console.log('handleFormSubmit');
		console.log({ e });
		const {
			name: { value: name },
			description: { value: description }
		} = e.target.elements;

		const { data, errors: resErrors } = await KQL_AssociationPatch.mutate({
			variables: { id, name, description }
		});

		if (resErrors) {
			// handle resErrors
		}
		const { association, errors, ok } = data.associationPatch;
		if (ok) {
			console.log({ association });
			patchAssociationStore(association);
			console.log('post patch', $KQL_AssociationById);
		}
		// handle errors
	}
</script>

<StatusHandler {status} {errors} value={association} entityName="association">
	<Layout
		name={association.name}
		properties={{
			Description: association.description
		}}
		imageId={association.imageIds[0] || 'dnd/sfaedxiltuowlw7whb0c'}
		{lockUser}
		{lockedBySelf}
		onEditClick={handleEditClick}
		onSaveClick={handleFormSubmit}
	>
		<EditableMarkdown
			value={markdownNotes}
			editing={association.lockedBySelf}
			slot="markdown-notes"
		/>
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
	<!-- {/if} -->
</StatusHandler>
<!-- <KitQLInfo store={KQL_AssociationById} /> -->
