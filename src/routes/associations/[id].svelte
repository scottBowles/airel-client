<script context="module" lang="ts">
	import {
		getAssociationById,
		associationById as queriedAssociation
	} from '$lib/graphql/AssociationQueries.gq';

	export const load = async ({ fetch, params }) =>
		await getAssociationById({
			variables: { id: params.id },
			fetch
		});
</script>

<script>
	import { page } from '$app/stores';
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import EditableMarkdown from '$lib/components/EditableMarkdown.svelte';
	import { associationPatch, associationLock } from '$lib/graphql/AssociationQueries.gq';

	$: ({ gQueryStatus, association, errors } = $queriedAssociation);

	let value = association?.markdownNotes;

	async function handleMarkdownEditClick() {
		console.log('handleMarkdownEditClick');
		// Attempt to lock.
		const lockRes = await associationLock({ variables: { id: $page.params.id } });
		// Throw error if already locked.
		return;
	}

	async function handleMarkdownSaveClick() {
		// Attempt to save.
		const res = await associationPatch({
			variables: {
				id: $page.params.id,
				markdownNotes: value
			}
		});
		// Throw error on failure.
		return;
	}
</script>

<StatusHandler status={gQueryStatus} {errors} value={association} entityName="association">
	<Layout
		name={association.name}
		properties={{
			Description: association.description
		}}
		imageId={association.imageId}
	>
		<EditableMarkdown
			{value}
			isLockedByAnotherUser={false}
			onSave={handleMarkdownSaveClick}
			onEditClick={handleMarkdownEditClick}
			slot="markdown-notes"
		/>
	</Layout>
</StatusHandler>
