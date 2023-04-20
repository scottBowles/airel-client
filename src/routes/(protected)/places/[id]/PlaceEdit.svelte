<script lang="ts">
	import { fragment, graphql, UpdatePlaceStore, type PlaceEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';

	const updatePlace = new UpdatePlaceStore();

	export let place: PlaceEditFields;

	$: data = fragment(
		place,
		graphql(`
			fragment PlaceEditFields on Place {
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

		updatePlace.mutate({ id, name, description, markdownNotes });
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutEdit entity={$data} />
</form>
