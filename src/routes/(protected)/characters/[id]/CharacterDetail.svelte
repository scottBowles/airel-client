<script lang="ts">
	import { fragment, graphql, CharacterLockStore, type CharacterDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';

	const lockForEditMutation = new CharacterLockStore();

	export let character: CharacterDetailFields;

	$: data = fragment(
		character,
		graphql(`
			fragment CharacterDetailFields on Character {
				id
				...EntityDetailFields
			}
		`)
	);

	$: ({ id } = $data);

	const onEditClick = () => lockForEditMutation.mutate({ id });
</script>

<LayoutDisplay entity={$data} {onEditClick} />
