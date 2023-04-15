<script lang="ts">
	import { fragment, graphql, UpdateRaceStore, type RaceEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';

	const updateRace = new UpdateRaceStore();

	export let race: RaceEditFields;
	export let onImageUpload: (error: any, result: any) => Promise<void>;

	$: data = fragment(
		race,
		graphql(`
			fragment RaceEditFields on Race {
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

		updateRace.mutate({ id, name, description, markdownNotes });
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
