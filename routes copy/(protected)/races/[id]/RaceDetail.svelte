<script lang="ts">
	import { fragment, graphql, type RaceDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';

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
</script>

<LayoutDisplay entity={$data} />
