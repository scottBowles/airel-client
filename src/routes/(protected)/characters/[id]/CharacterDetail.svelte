<svelte:options runes={true} />

<script lang="ts">
	import { fragment, graphql, type CharacterDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';
	import Spacer from '$lib/components/Spacer.svelte';

	let { character }: { character: CharacterDetailFields } = $props();

	let data = $derived(
		fragment(
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
		)
	);

	let { race, associations: associationConnection } = $derived($data);
	let associations = $derived(associationConnection?.edges.map(({ node }) => node) || []);
</script>

<LayoutDisplay entity={$data}>
	{#snippet propertiesSnippet()}
		<Spacer lg />

		<div class="items-container">
			<h2 class="text-xl font-bold">Race</h2>
			<Spacer xs />
			{#if race}
				<div>
					<a class="link link-accent link-hover" href={`/races/${race.id}`}>
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
					{#each associations as association, i (association.id)}
						<a class="link link-accent link-hover" href={`/associations/${association.id}`}
							>{association.name}</a
						>{i < associations.length - 1 ? ', ' : ''}
					{/each}
				</div>
			</div>
		{/if}
		<Spacer lg />
	{/snippet}
</LayoutDisplay>
