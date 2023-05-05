<script lang="ts">
	import { fromGlobalId } from 'graphql-relay';
	import { fragment, graphql, type AssociationDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';
	import Spacer from '$lib/components/Spacer.svelte';

	export let association: AssociationDetailFields;

	$: data = fragment(
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
	);

	$: ({ characters: charactersConnection } = $data);
	$: characters = charactersConnection?.edges.map(({ node }) => node) || [];
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
						<a
							href={`/characters/${fromGlobalId(character.id).id}`}
							class="link link-accent link-hover">{character.name}</a
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
