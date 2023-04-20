<script lang="ts">
	import { fragment, graphql, PlaceLockStore, type PlaceDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';

	const lockForEditMutation = new PlaceLockStore();

	export let place: PlaceDetailFields;

	$: data = fragment(
		place,
		graphql(`
			fragment PlaceDetailFields on Place {
				id
				...EntityDetailFields
			}
		`)
	);

	$: ({ id } = $data);

	const onEditClick = () => lockForEditMutation.mutate({ id });
</script>

<LayoutDisplay entity={$data} {onEditClick} />
