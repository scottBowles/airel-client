<script lang="ts">
	import { fragment, graphql, AssociationLockStore, type AssociationDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';

	const lockForEditMutation = new AssociationLockStore();

	export let association: AssociationDetailFields;
	export let onImageUpload: (error: any, result: any) => Promise<void>;
	export let onLogAddition: (logUrl: string) => Promise<void>;
	export let onLogRemoval: (logId: string) => Promise<void>;

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
	{name}
	{description}
	{markdownNotes}
	{logs}
	{imageIds}
	{lockUser}
	{onEditClick}
	{onImageUpload}
	{onLogAddition}
	{onLogRemoval}
/>
