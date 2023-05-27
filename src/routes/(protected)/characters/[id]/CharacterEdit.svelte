<script lang="ts">
	import { fragment, graphql, UpdateCharacterStore, type CharacterEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';
	import RelatedAssociationMultiSelect from '$lib/components/RelatedAssociationMultiSelect.svelte';
	import RelatedRaceSelect from '$lib/components/RelatedRaceSelect.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { parseFormData } from 'parse-nested-form-data';

	const updateCharacter = new UpdateCharacterStore();

	export let character: CharacterEditFields;

	$: data = fragment(
		character,
		graphql(`
			fragment CharacterEditFields on Character {
				id
				associations {
					edges {
						node {
							id
						}
					}
				}
				race {
					id
				}
				...EntityEditFields
			}
		`)
	);

	$: ({ id, associations: associationConnection, race } = $data);
	$: initialAssociationIds = associationConnection?.edges.map(({ node }) => node.id) || [];

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		updateCharacter.mutate({ id, ...parsed });
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutEdit entity={$data}>
		<svelte:fragment slot="properties">
			<Spacer lg />
			<RelatedRaceSelect initialRaceId={race?.id} />
			<Spacer lg />
			<RelatedAssociationMultiSelect ids={initialAssociationIds} />
			<Spacer lg />
		</svelte:fragment>
	</LayoutEdit>
</form>
