<script context="module" lang="ts">
	import { getRaces, races as queriedRaces } from '$lib/graphql/RaceQueries.gq';

	export async function load({ fetch }) {
		await getRaces({ fetch });
		return {};
	}
</script>

<script>
	import { Anchor, Heading } from '@kahi-ui/framework';

	$: races = $queriedRaces?.races.edges?.map(({ node }) => node);
	$: console.log({ races });
</script>

<Heading>Races:</Heading>
<dl>
	{#each races as race}
		<dt><Anchor href={`races/${race.id}`}>Name: {race.name}</Anchor></dt>
		<dd>Size: {race.size}</dd>
	{/each}
</dl>
