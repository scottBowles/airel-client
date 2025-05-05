<script lang="ts">
	import { fragment, graphql, UpdateRaceStore, type RaceEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';

	const updateRace = new UpdateRaceStore();

	interface Props {
		race: RaceEditFields;
	}

	let { race }: Props = $props();

	let data = $derived(
		fragment(
			race,
			graphql(`
				fragment RaceEditFields on Race {
					id
					...EntityEditFields
				}
			`)
		)
	);

	let { id } = $derived($data);

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		const name = data.get('name')?.toString();
		const description = data.get('description')?.toString();
		const markdownNotes = data.get('markdownNotes')?.toString();

		updateRace.mutate({ id, name, description, markdownNotes });
	};
</script>

<form method="POST" onsubmit={handleSubmit}>
	<LayoutEdit entity={$data} />
</form>
