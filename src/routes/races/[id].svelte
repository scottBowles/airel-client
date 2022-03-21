<script context="module" lang="ts">
	import { getRaceById, raceById as queriedRace } from '$lib/graphql/RaceQueries.gq';

	export const load = async ({ fetch, params }) =>
		await getRaceById({ fetch, variables: { id: params.id } });
</script>

<script>
	import { Layout, BasicProperty } from '$lib/components/DetailPage';
	import { capitalize } from '$lib/utils';

	$: race = $queriedRace?.race;
	$: console.log({ race });
</script>

<Layout name={race.name}>
	<svelte:fragment slot="properties">
		{#if race.baseRace}
			<BasicProperty name="Base Race">
				<a href={`/races/${race.baseRace.id}`}>{race.baseRace.name}</a>
			</BasicProperty>
		{/if}
		{#if race.subraces}
			<BasicProperty name="Subraces">
				{#each race.subraces.edges as subrace}
					<div><a href={`/races/${subrace.node.id}`}>{subrace.node.name}</a></div>
				{/each}
			</BasicProperty>
		{/if}
		<!-- <BasicProperty name="Description" value={race.description} /> -->
		<BasicProperty name="Alignment" value={race.alignment} />
		<BasicProperty name="Life Expectancy" value={race.lifeExpectancy} />
		<BasicProperty name="Size" value={capitalize(race.size)} />
		<BasicProperty name="Speed" value={race.speed} />
	</svelte:fragment>
</Layout>

<style>
	a {
		color: #908149;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
