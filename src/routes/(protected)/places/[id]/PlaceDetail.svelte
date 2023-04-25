<script lang="ts">
	import { fragment, graphql, PlaceLockStore, type PlaceDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';
	import Breadcrumbs from '../Breadcrumbs.svelte';

	const lockForEditMutation = new PlaceLockStore();

	export let place: PlaceDetailFields;

	$: data = fragment(
		place,
		graphql(`
			fragment PlaceDetailFields on Place {
				id
				...PlaceBreadcrumbFields
				...EntityDetailFields
			}
		`)
	);

	$: ({ id } = $data);

	const onEditClick = () => lockForEditMutation.mutate({ id });
</script>

<Breadcrumbs place={$data} />
<LayoutDisplay entity={$data} {onEditClick} />
