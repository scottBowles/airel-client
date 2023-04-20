<script lang="ts">
	import { fragment, graphql, RaceLockStore, type RaceDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';

	const lockForEditMutation = new RaceLockStore();

	export let race: RaceDetailFields;

	$: data = fragment(
		race,
		graphql(`
			fragment RaceDetailFields on Race {
				id
				...EntityDetailFields
			}
		`)
	);

	$: ({ id } = $data);

	const onEditClick = () => lockForEditMutation.mutate({ id });
</script>

<LayoutDisplay entity={$data} {onEditClick} />
