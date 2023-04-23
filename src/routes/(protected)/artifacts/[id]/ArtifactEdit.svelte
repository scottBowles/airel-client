<script lang="ts">
	import { fragment, graphql, UpdateArtifactStore, type ArtifactEditFields } from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';
	import MultiSelect from '$lib/components/MultiSelect.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { parseFormData } from 'parse-nested-form-data';

	const updateArtifact = new UpdateArtifactStore();

	export let artifact: ArtifactEditFields;

	$: data = fragment(
		artifact,
		graphql(`
			fragment ArtifactEditFields on Artifact {
				id
				items {
					edges {
						node {
							id
						}
					}
				}
				...EntityEditFields
			}
		`)
	);

	const itemNamesAndIdsQuery = graphql(`
		query ItemNamesAndIds @load {
			items {
				edges {
					node {
						id
						name
					}
				}
			}
		}
	`);

	$: ({ id, items } = $data);
	$: ITEM_SELECT_ID = `artifact-${id}-item-select`;
	$: itemIds = items.edges.map((edge) => edge.node.id);
	$: itemsForSelect =
		$itemNamesAndIdsQuery.data?.items.edges.map((edge) => ({
			value: edge.node.id,
			label: edge.node.name
		})) || [];

	let selectedItems = itemIds || [];

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		updateArtifact.mutate({ id, ...parsed });
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutEdit entity={$data}>
		<svelte:fragment slot="properties">
			<Spacer lg />
			<div class="form-control w-full max-w-xs">
				<label class="label" for={ITEM_SELECT_ID}>
					<span class="label-text">Select Related Items</span>
				</label>
				{#if $itemNamesAndIdsQuery.fetching}
					Loading Items...
				{:else}
					<MultiSelect
						id={ITEM_SELECT_ID}
						options={itemsForSelect}
						initialValues={itemIds}
						bind:values={selectedItems}
					/>
				{/if}
				{#each selectedItems as itemId, i}
					<input type="hidden" name={`items.set[${i}].id`} value={itemId} />
				{/each}
			</div>
		</svelte:fragment>
	</LayoutEdit>
</form>
