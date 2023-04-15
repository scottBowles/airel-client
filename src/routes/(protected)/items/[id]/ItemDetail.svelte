<script lang="ts">
	import { fragment, graphql, ItemLockStore, type ItemDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';

	const lockForEditMutation = new ItemLockStore();

	export let item: ItemDetailFields;
	export let onImageUpload: (error: any, result: any) => Promise<void>;

	$: data = fragment(
		item,
		graphql(`
			fragment ItemDetailFields on Item {
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
	{id}
	{name}
	{description}
	{markdownNotes}
	{logs}
	{imageIds}
	{lockUser}
	{onEditClick}
	{onImageUpload}
/>
