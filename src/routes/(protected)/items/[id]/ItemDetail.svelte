<script lang="ts">
	import { fragment, graphql, ItemLockStore, type ItemDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';

	const lockForEditMutation = new ItemLockStore();

	export let item: ItemDetailFields;

	$: data = fragment(
		item,
		graphql(`
			fragment ItemDetailFields on Item {
				id
				...EntityDetailFields
			}
		`)
	);

	$: ({ id } = $data);

	const onEditClick = () => lockForEditMutation.mutate({ id });
</script>

<LayoutDisplay entity={$data} {onEditClick} />
