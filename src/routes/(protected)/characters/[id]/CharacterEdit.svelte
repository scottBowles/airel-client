<script lang="ts">
	import { fragment, graphql, UpdateCharacterStore, type CharacterEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';

	const updateCharacter = new UpdateCharacterStore();

	export let character: CharacterEditFields;

	$: data = fragment(
		character,
		graphql(`
			fragment CharacterEditFields on Character {
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

		updateCharacter.mutate({ id, name, description, markdownNotes });
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutEdit entity={$data} />
</form>
