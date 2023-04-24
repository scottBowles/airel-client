<script lang="ts">
	import { fragment, graphql, ArtifactLockStore, type ArtifactDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';
	import ItemListDisplay from '$lib/components/ItemListDisplay.svelte';
	import Spacer from '$lib/components/Spacer.svelte';

	const lockForEditMutation = new ArtifactLockStore();

	export let artifact: ArtifactDetailFields;

	$: data = fragment(
		artifact,
		graphql(`
			fragment ArtifactDetailFields on Artifact {
				id
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

	$: ({ id, items } = $data);
	$: itemNodes = items?.edges?.map(({ node }) => node) || [];

	const onEditClick = () => lockForEditMutation.mutate({ id });
</script>

<LayoutDisplay entity={$data} {onEditClick}>
	<svelte:fragment slot="properties">
		<Spacer lg />

		<div class="flex flex-col gap-4">
			{#each itemNodes as item (item.id)}
				<ItemListDisplay {item} />
			{/each}
		</div>
	</svelte:fragment>
</LayoutDisplay>
