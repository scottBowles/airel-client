<svelte:options runes={true} />

<script lang="ts">
	import { fragment, graphql, type ArtifactDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';
	import ItemListDisplay from '$lib/components/ItemListDisplay.svelte';
	import Spacer from '$lib/components/Spacer.svelte';

	let { artifact }: { artifact: ArtifactDetailFields } = $props();

	let data = $derived(
		fragment(
			artifact,
			graphql(`
				fragment ArtifactDetailFields on Artifact {
					items {
						edges {
							node {
								id
								...ItemListFields
							}
						}
					}
					...EntityDetailFields
				}
			`)
		)
	);

	let { items } = $derived($data);
	let itemNodes = $derived(items?.edges?.map(({ node }) => node) || []);
</script>

<LayoutDisplay entity={$data}>
	{#snippet propertiesSnippet()}
		<Spacer lg />

		<div class="flex flex-col gap-4">
			{#each itemNodes as item (item.id)}
				<ItemListDisplay {item} />
			{/each}
		</div>
	{/snippet}
</LayoutDisplay>
