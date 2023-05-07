<script lang="ts">
	import { fromGlobalId } from 'graphql-relay';
	import { fragment, graphql, type CharacterDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';
	import Spacer from '$lib/components/Spacer.svelte';

	export let character: CharacterDetailFields;

	$: data = fragment(
		character,
		graphql(`
			fragment CharacterDetailFields on Character {
				race {
					id
					name
				}
				associations {
					edges {
						node {
							id
							name
						}
					}
				}
				...EntityDetailFields
			}
		`)
	);

	$: ({ race, associations: associationConnection } = $data);
	$: associations = associationConnection?.edges.map(({ node }) => node) || [];
</script>

<LayoutDisplay entity={$data}>
	<svelte:fragment slot="properties">
		<Spacer lg />

		<div class="items-container">
			<h2 class="text-xl font-bold">Race</h2>
			<Spacer xs />
			{#if race}
				<div>
					<a class="link link-accent link-hover" href={`/races/${fromGlobalId(race.id).id}`}>
						{race.name}
					</a>
				</div>
			{:else}
				<div>No race selected yet</div>
			{/if}
		</div>
		<Spacer lg />

		{#if associations?.length > 0}
			<div class="items-container">
				<h2 class="text-xl font-bold">Associations</h2>
				<Spacer xs />
				<div>
					{#each associations as association, i}
						<a
							class="link link-accent link-hover"
							href={`/associations/${fromGlobalId(association.id).id}`}>{association.name}</a
						>{i < associations.length - 1 ? ', ' : ''}
					{/each}
				</div>
			</div>
		{/if}
		<Spacer lg />
	</svelte:fragment>
</LayoutDisplay>
