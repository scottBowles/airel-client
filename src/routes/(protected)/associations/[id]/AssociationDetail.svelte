<script lang="ts">
	import { fragment, graphql, AssociationLockStore, type AssociationDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';
	import Spacer from '$lib/components/Spacer.svelte';
	import { fromGlobalId } from 'graphql-relay';

	const lockForEditMutation = new AssociationLockStore();

	export let association: AssociationDetailFields;

	$: data = fragment(
		association,
		graphql(`
			fragment AssociationDetailFields on Association {
				id
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

	$: ({ id, characters: charactersConnection } = $data);
	$: characters = charactersConnection?.edges.map(({ node }) => node) || [];

	const onEditClick = () => lockForEditMutation.mutate({ id });
</script>

<LayoutDisplay entity={$data} {onEditClick}>
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
