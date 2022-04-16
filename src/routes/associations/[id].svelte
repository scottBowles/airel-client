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
	import { page } from '$app/stores';
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import EditableMarkdown from '$lib/components/EditableMarkdown.svelte';

	const { id } = $page.params;

	$: ({ status, errors, data } = $KQL_AssociationById);
	$: ({ association } = data || {});
	let { markdownNotes } = association || {};

	async function handleMarkdownEditClick() {
		const lockRes = await KQL_AssociationLock.mutate({ variables: { id } });
		// Throw error if already locked.
		return;
	}

	async function handleMarkdownSaveClick() {
		// Attempt to save.
		const res = await KQL_AssociationPatch.mutate({ variables: { id, markdownNotes } });
		// Throw error on failure.
		return;
	}
</script>

<StatusHandler {status} {errors} value={association} entityName="association">
	<Layout
		name={association.name}
		properties={{
			Description: association.description
		}}
		imageId={association.imageId}
	>
		<EditableMarkdown
			value={markdownNotes}
			isLockedByAnotherUser={false}
			onSave={handleMarkdownSaveClick}
			onEditClick={handleMarkdownEditClick}
			slot="markdown-notes"
		/>
	</Layout>
</StatusHandler>
<KitQLInfo store={KQL_AssociationById} />
