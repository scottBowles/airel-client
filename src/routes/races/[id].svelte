<script context="module" lang="ts">
	import { KQL_RaceById } from '$lib/graphql/_kitql/graphqlStores';

	export const load = async ({ fetch, params }) => {
		await KQL_RaceById.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script>
	import { Layout, BasicProperty, StatusHandler } from '$lib/components/DetailPage';
	import { capitalize } from '$lib/utils';

	$: ({ status, errors, data } = $KQL_RaceById);
	$: ({ race } = data || {});
	$: console.log({ race });
</script>

<StatusHandler {status} {errors} value={race} entityName="race">
	<Layout name={race.name} imageId={race.imageIds[0]} markdownNotes={race.markdownNotes}>
		<svelte:fragment slot="properties">
			{#if race.baseRace}
				<BasicProperty name="Base Race">
					<a href={`/races/${race.baseRace.id}`} sveltekit:prefetch>{race.baseRace.name}</a>
				</BasicProperty>
			{/if}
			{#if race.subraces}
				<BasicProperty name="Subraces">
					{#each race.subraces.edges as subrace}
						<div>
							<a href={`/races/${subrace.node.id}`} sveltekit:prefetch>{subrace.node.name}</a>
						</div>
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
</StatusHandler>

<style>
	a {
		color: #908149;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
