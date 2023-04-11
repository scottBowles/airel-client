<script lang="ts">
	import { fragment, graphql, type AssociationEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';

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

	const updateMutation = graphql(`
		mutation UpdateAssociation(
			$id: GlobalID!
			$name: String
			$description: String
			$markdownNotes: String
		) {
			updateAssociation(
				input: { id: $id, name: $name, description: $description, markdownNotes: $markdownNotes }
			) {
				... on Association {
					id
					name
					description
					markdownNotes
					lockTime
					lockedBySelf
					lockUser {
						id
						username
					}
				}
			}
		}
	`);

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const name = data.get('name')?.toString();
		const description = data.get('description')?.toString();
		const markdownNotes = data.get('markdownNotes')?.toString();

		updateMutation.mutate({ id, name, description, markdownNotes });
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutEdit {id} {name} {description} {markdownNotes} {logs} {imageIds} {lockUser}>e</LayoutEdit>
</form>
