<script lang="ts">
	import { fragment, graphql, CharacterLockStore, type CharacterDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';

	const lockForEditMutation = new CharacterLockStore();

	export let character: CharacterDetailFields;
	export let onImageUpload: (error: any, result: any) => Promise<void>;
	export let onLogAddition: (logUrl: string) => Promise<void>;
	export let onLogRemoval: (logId: string) => Promise<void>;

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
