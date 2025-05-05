<script lang="ts">
	import { fragment, graphql, UpdateAssociationStore, type AssociationEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';
	import RelatedCharacterMultiSelect from '$lib/components/RelatedCharacterMultiSelect.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { parseFormData } from 'parse-nested-form-data';

	const updateAssociation = new UpdateAssociationStore();

	interface Props {
		association: AssociationEditFields;
	}

	let { association }: Props = $props();

	let data = $derived(
		fragment(
			association,
			graphql(`
				fragment AssociationEditFields on Association {
					id
					characters {
						edges {
							node {
								id
								name
								description
							}
						}
					}
					...EntityEditFields
				}
			`)
		)
	);

	let { id, characters: charactersConnection } = $derived($data);
	let characters = $derived(charactersConnection?.edges.map(({ node }) => node) || []);
	let initialCharacterIds = $derived(characters.map(({ id }) => id));

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		updateAssociation.mutate({ id, ...parsed });
	};
</script>

<form method="POST" onsubmit={handleSubmit}>
	<LayoutEdit entity={$data}>
		{#snippet properties()}
			<Spacer lg />
			<RelatedCharacterMultiSelect ids={initialCharacterIds} entityDisplayName="Members" />
			<Spacer lg />
		{/snippet}
	</LayoutEdit>
</form>
