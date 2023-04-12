<script lang="ts">
	import { fragment, graphql, UpdateItemStore, type ItemEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';

	const updateItem = new UpdateItemStore();

	export let item: ItemEditFields;
	export let onImageUpload: (error: any, result: any) => Promise<void>;

	$: data = fragment(
		item,
		graphql(`
			fragment ItemEditFields on Item {
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

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const name = data.get('name')?.toString();
		const description = data.get('description')?.toString();
		const markdownNotes = data.get('markdownNotes')?.toString();

		updateItem.mutate({ id, name, description, markdownNotes });
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutEdit
		{id}
		{name}
		{description}
		{markdownNotes}
		{logs}
		{imageIds}
		{lockUser}
		{onImageUpload}
	/>
</form>
