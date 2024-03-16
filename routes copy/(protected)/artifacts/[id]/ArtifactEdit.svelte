<script lang="ts">
	import { parseFormData } from 'parse-nested-form-data';
	import { fragment, graphql, UpdateArtifactStore, type ArtifactEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';
	import RelatedItemMultiSelect from '$lib/components/RelatedItemMultiSelect.svelte';
	import Spacer from '$lib/components/Spacer.svelte';

	const updateArtifact = new UpdateArtifactStore();

	export let artifact: ArtifactEditFields;

	$: data = fragment(
		artifact,
		graphql(`
			fragment ArtifactEditFields on Artifact {
				id
				items {
					edges {
						node {
							id
						}
					}
				}
				...EntityEditFields
			}
		`)
	);

	$: ({ id, items } = $data);
	$: initialItemIds = items.edges.map((edge) => edge.node.id);

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		updateArtifact.mutate({ id, ...parsed });
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutEdit entity={$data}>
		<svelte:fragment slot="properties">
			<Spacer lg />
			<RelatedItemMultiSelect id={`artifact-${id}-item-select`} ids={initialItemIds} />
		</svelte:fragment>
	</LayoutEdit>
</form>
