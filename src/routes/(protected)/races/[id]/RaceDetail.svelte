<svelte:options runes={true} />

<script lang="ts">
	import { fragment, graphql, type RaceDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';

	let { race }: { race: RaceDetailFields } = $props();

	let data = $derived(
		fragment(
			race,
			graphql(`
				fragment RaceDetailFields on Race {
					id
					...EntityDetailFields
				}
			`)
		)
	);
</script>

<LayoutDisplay entity={$data} />
