<script lang="ts">
	import { fragment, graphql, UpdateItemStore, type ItemEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';

	const updateItem = new UpdateItemStore();

	export let item: ItemEditFields;

	$: data = fragment(
		item,
		graphql(`
			fragment ItemEditFields on Item {
				id
				...EntityEditFields
			}
		`)
	);

	$: ({ id } = $data);

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const name = data.get('name')?.toString();
		const description = data.get('description')?.toString();
		const markdownNotes = data.get('markdownNotes')?.toString();

		updateItem.mutate({ id, name, description, markdownNotes });
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutEdit entity={$data} />
</form>
