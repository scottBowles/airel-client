<script lang="ts">
	import { fragment, graphql, UpdateAssociationStore, type AssociationEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';

	const updateAssociation = new UpdateAssociationStore();

	export let association: AssociationEditFields;

	$: data = fragment(
		association,
		graphql(`
			fragment AssociationEditFields on Association {
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

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const name = data.get('name')?.toString();
		const description = data.get('description')?.toString();
		const markdownNotes = data.get('markdownNotes')?.toString();

		updateAssociation.mutate({ id, name, description, markdownNotes });
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutEdit {id} {name} {description} {markdownNotes} {logs} {imageIds} {lockUser} />
</form>
