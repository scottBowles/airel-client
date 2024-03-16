<script lang="ts">
	import { fragment, graphql, UpdateRaceStore, type RaceEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';

	const updateRace = new UpdateRaceStore();

	export let race: RaceEditFields;

	$: data = fragment(
		race,
		graphql(`
			fragment RaceEditFields on Race {
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

		updateRace.mutate({ id, name, description, markdownNotes });
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutEdit entity={$data} />
</form>
