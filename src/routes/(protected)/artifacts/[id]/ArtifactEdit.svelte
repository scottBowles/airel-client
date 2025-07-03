<script lang="ts">
	import { parseFormData } from 'parse-nested-form-data';
	import { fragment, graphql, UpdateArtifactStore, type ArtifactEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';
	import RelatedItemMultiSelect from '$lib/components/RelatedItemMultiSelect.svelte';
	import Spacer from '$lib/components/Spacer.svelte';

	const updateArtifact = new UpdateArtifactStore();

	interface Props {
		artifact: ArtifactEditFields;
	}

	let { artifact }: Props = $props();

	let data = $derived(
		fragment(
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
		)
	);

	let { id, items } = $derived($data);
	let initialItemIds = $derived(items.edges.map((edge) => edge.node.id));

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		updateArtifact.mutate({ id, ...parsed });
	};
</script>

<form method="POST" onsubmit={handleSubmit}>
	<LayoutEdit entity={$data}>
		{#snippet properties()}
			<Spacer lg />
			<RelatedItemMultiSelect id={`artifact-${id}-item-select`} ids={initialItemIds} />
		{/snippet}
	</LayoutEdit>
</form>
