<script context="module" lang="ts">
	import { getItems, items as queriedItems } from '$lib/graphql/ItemQueries.gq';

	export async function load({ fetch }) {
		await getItems({ fetch });
		return {};
	}
</script>

<script>
	import { Anchor, Heading } from '@kahi-ui/framework';

	$: items = $queriedItems?.items.edges?.map(({ node }) => node);
	$: console.log({ items });
</script>

<Heading>Items:</Heading>
<dl>
	{#each items as item}
		<dt><Anchor href={`items/${item.id}`}>Name: {item.name}</Anchor></dt>
		<dd>Description: {item.description}</dd>
	{/each}
</dl>
