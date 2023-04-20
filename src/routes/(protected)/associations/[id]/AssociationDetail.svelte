<script lang="ts">
	import { fragment, graphql, AssociationLockStore, type AssociationDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';

	const lockForEditMutation = new AssociationLockStore();

	export let association: AssociationDetailFields;

	$: data = fragment(
		association,
		graphql(`
			fragment AssociationDetailFields on Association {
				id
				...EntityDetailFields
				characters {
					edges {
						node {
							id
							name
							description
						}
					}
				}
			}
		`)
	);

	$: ({ id, characters: charactersConnection } = $data);

	const onEditClick = () => lockForEditMutation.mutate({ id });
</script>

<LayoutDisplay entity={$data} {onEditClick} />
