<script lang="ts">
	import { fragment, graphql, CharacterLockStore, type CharacterDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';

	const lockForEditMutation = new CharacterLockStore();

	export let character: CharacterDetailFields;

	$: data = fragment(
		character,
		graphql(`
			fragment CharacterDetailFields on Character {
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
			}
		`)
	);

	$: ({ id, name, description, markdownNotes, logs, imageIds = [], lockUser } = $data);

	const lockForEdit = () => lockForEditMutation.mutate({ id });
</script>

<LayoutDisplay
	{id}
	{name}
	{description}
	{markdownNotes}
	{logs}
	{imageIds}
	{lockUser}
	onEditClick={lockForEdit}
/>
