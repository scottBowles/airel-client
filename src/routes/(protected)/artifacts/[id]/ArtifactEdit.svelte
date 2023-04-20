<script lang="ts">
	import { fragment, graphql, UpdateArtifactStore, type ArtifactEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';

	const updateArtifact = new UpdateArtifactStore();

	export let artifact: ArtifactEditFields;

	$: data = fragment(
		artifact,
		graphql(`
			fragment ArtifactEditFields on Artifact {
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

		updateArtifact.mutate({ id, name, description, markdownNotes });
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutEdit entity={$data} />
</form>
