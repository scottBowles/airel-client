<script lang="ts">
	import { fragment, graphql, type AssociationDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';

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
				npcs {
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
		npcs: npcsConnection
	} = $data);

	const lockForEdit = graphql(`
		mutation AssociationLock($id: GlobalID!) {
			associationLock(input: { id: $id }) {
				... on Association {
					id
					lockedBySelf
					lockTime
					lockUser {
						id
						username
					}
				}
			}
		}
	`);
</script>

<LayoutDisplay
	{id}
	{name}
	{description}
	{markdownNotes}
	{logs}
	{imageIds}
	{lockUser}
	onEditClick={() => lockForEdit.mutate({ id })}
/>
