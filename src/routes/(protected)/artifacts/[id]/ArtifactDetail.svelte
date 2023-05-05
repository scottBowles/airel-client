<script lang="ts">
	import { fragment, graphql, type ArtifactDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';
	import ItemListDisplay from '$lib/components/ItemListDisplay.svelte';
	import Spacer from '$lib/components/Spacer.svelte';

	export let artifact: ArtifactDetailFields;

	$: data = fragment(
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
	);

	$: ({ items } = $data);
	$: itemNodes = items?.edges?.map(({ node }) => node) || [];
</script>

<LayoutDisplay entity={$data}>
	<svelte:fragment slot="properties">
		<Spacer lg />

		<div class="flex flex-col gap-4">
			{#each itemNodes as item (item.id)}
				<ItemListDisplay {item} />
			{/each}
		</div>
	</svelte:fragment>
</LayoutDisplay>
