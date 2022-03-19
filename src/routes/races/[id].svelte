<script context="module" lang="ts">
	import { getRaceById, raceById as queriedRace } from '$lib/graphql/RaceQueries.gq';

	export async function load({ fetch, params }) {
		const { id } = params;
		const a = await getRaceById({ fetch, variables: { id } });
		return {};
	}
</script>

<script>
	import { Heading } from '@kahi-ui/framework';

	$: race = $queriedRace?.race;
</script>

<Heading is="h1">{race.name}</Heading>
