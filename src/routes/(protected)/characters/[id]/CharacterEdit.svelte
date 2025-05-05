<script lang="ts">
	import { fragment, graphql, UpdateCharacterStore, type CharacterEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';
	import RelatedAssociationMultiSelect from '$lib/components/RelatedAssociationMultiSelect.svelte';
	import RelatedRaceSelect from '$lib/components/RelatedRaceSelect.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { parseFormData } from 'parse-nested-form-data';

	const updateCharacter = new UpdateCharacterStore();

	interface Props {
		character: CharacterEditFields;
	}

	let { character }: Props = $props();

	let data = $derived(
		fragment(
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
		)
	);

	let { id, associations: associationConnection, race } = $derived($data);
	let initialAssociationIds = $derived(
		associationConnection?.edges.map(({ node }) => node.id) || []
	);

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		updateCharacter.mutate({ id, ...parsed });
	};
</script>

<form method="POST" onsubmit={handleSubmit}>
	<LayoutEdit entity={$data}>
		{#snippet properties()}
			<Spacer lg />
			<RelatedRaceSelect initialRaceId={race?.id} />
			<Spacer lg />
			<RelatedAssociationMultiSelect ids={initialAssociationIds} />
			<Spacer lg />
		{/snippet}
	</LayoutEdit>
</form>
