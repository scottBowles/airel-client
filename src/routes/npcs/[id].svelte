<script context="module" lang="ts">
	import { getNpcById, npcById as queriedNpc } from '$lib/graphql/NpcQueries.gq';
	import { withToken } from '$lib/utils';

	export const load = async ({ fetch, params, session }) =>
		await getNpcById({ fetch: withToken(fetch, session), variables: { id: params.id } });
</script>

<script>
	import { Layout, BasicProperty } from '$lib/components/DetailPage';

	$: ({ gQueryStatus, npc } = $queriedNpc);
</script>

{#if gQueryStatus === 'LOADED' && npc}
	<Layout name={npc.name} imageId={npc.imageId}>
		<svelte:fragment slot="properties">
			<BasicProperty name="Description" value={npc.description} />
			<BasicProperty name="Race">
				<a href={`/races/${npc.race.id}`}>{npc.race.name}</a>
			</BasicProperty>
		</svelte:fragment>
	</Layout>
{:else if gQueryStatus === 'LOADED' && !npc}
	<Layout name="NPC Not Found">
		<BasicProperty
			name=""
			value="We couldn't find that NPC. How'd you get here anyway? Are you trying weird things with the url? Or maybe they were deleted! The poor thing. In any event, maybe go back to the npcs page or your home page and try again."
			slot="properties"
		/>
	</Layout>
{:else if gQueryStatus === 'LOADING'}
	<Layout name="Loading" />
{:else if gQueryStatus === 'ERROR'}
	<Layout name="Something went wrong">
		<svelte:fragment slot="properties">
			{#each $queriedNpc.errors as error}
				<BasicProperty name="Error" value={error.message} />
			{/each}
		</svelte:fragment>
	</Layout>
{:else}
	<Layout name="Something went wrong here" />
{/if}

<style>
	a {
		color: #908149;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
