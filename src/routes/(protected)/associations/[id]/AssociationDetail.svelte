<script lang="ts">
	import { fragment, graphql, AssociationLockStore, type AssociationDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';

	const lockForEditMutation = new AssociationLockStore();

	export let association: AssociationDetailFields;

	$: data = fragment(
		association,
		graphql(`
			fragment AssociationDetailFields on Association {
				id
				name
				description
				imageIds
				thumbnailId
				markdownNotes
				lockUser {
					id
					username
				}
				lockTime
				logs {
					edges {
						node {
							id
							url
							name
						}
					}
				}
				characters {
					edges {
						node {
							id
							name
							description
						}
					}
				}
			}
		`)
	);

	$: ({
		id,
		name,
		description,
		markdownNotes,
		logs,
		imageIds = [],
		lockUser,
		characters: charactersConnection
	} = $data);

	const onEditClick = () => lockForEditMutation.mutate({ id });
</script>

<LayoutDisplay
	{id}
	{name}
	{description}
	{markdownNotes}
	{logs}
	{imageIds}
	{lockUser}
	{onEditClick}
/>
