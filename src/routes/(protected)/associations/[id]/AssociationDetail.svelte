<svelte:options runes={true} />

<script lang="ts">
	import { fromGlobalId } from '$lib/utils';
	import { fragment, graphql, type AssociationDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';
	import Spacer from '$lib/components/Spacer.svelte';

	let { association } = $props<{ association: AssociationDetailFields }>();

	let data = $derived(
		fragment(
			association,
			graphql(`
				fragment AssociationDetailFields on Association {
					...EntityDetailFields
					characters {
						edges {
							node {
								id
								name
							}
						}
					}
				}
			`)
		)
	);

	let { characters: charactersConnection } = $derived($data);
	let characters = $derived(charactersConnection?.edges.map(({ node }) => node) || []);
</script>

<LayoutDisplay entity={$data}>
	<svelte:fragment slot="properties">
		<Spacer lg />
		<div class="items-container">
			<h2 class="text-xl font-bold">Members</h2>
			<Spacer xs />
			{#if characters?.length > 0}
				<div>
					{#each characters as character, i}
						{@const globalId = fromGlobalId(character.id).id}
						<a href={`/characters/${globalId}`} class="link link-accent link-hover"
							>{character.name}</a
						>{i < characters.length - 1 ? ', ' : ''}
					{/each}
				</div>
			{:else}
				<p class="text-slate-400">- None selected -</p>
			{/if}
		</div>
		<Spacer lg />
	</svelte:fragment>
</LayoutDisplay>
