<script lang="ts">
	import { fragment, graphql, UpdateAssociationStore, type AssociationEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';
	import RelatedCharacterMultiSelect from '$lib/components/RelatedCharacterMultiSelect.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { parseFormData } from 'parse-nested-form-data';

	const updateAssociation = new UpdateAssociationStore();

	export let association: AssociationEditFields;

	$: data = fragment(
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
	);

	$: ({ id, characters: charactersConnection } = $data);
	$: characters = charactersConnection?.edges.map(({ node }) => node) || [];
	$: initialCharacterIds = characters.map(({ id }) => id);

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		updateAssociation.mutate({ id, ...parsed });
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutEdit entity={$data}>
		<svelte:fragment slot="properties">
			<Spacer lg />
			<RelatedCharacterMultiSelect {initialCharacterIds} entityDisplayName="Members" />
			<Spacer lg />
		</svelte:fragment>
	</LayoutEdit>
</form>
