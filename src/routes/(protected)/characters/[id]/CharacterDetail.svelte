<script lang="ts">
	import { fragment, graphql, CharacterLockStore, type CharacterDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';
	import Spacer from '$lib/components/Spacer.svelte';
	import { fromGlobalId } from 'graphql-relay';

	const lockForEditMutation = new CharacterLockStore();

	export let character: CharacterDetailFields;

	$: data = fragment(
		character,
		graphql(`
			fragment CharacterDetailFields on Character {
				id
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

	$: ({ id, race, associations: associationConnection } = $data);
	$: associations = associationConnection?.edges.map(({ node }) => node) || [];

	const onEditClick = () => lockForEditMutation.mutate({ id });
</script>

<LayoutDisplay entity={$data} {onEditClick}>
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
