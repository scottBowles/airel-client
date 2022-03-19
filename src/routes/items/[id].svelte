<script context="module" lang="ts">
	import { getItemById, itemById as queriedItem } from '$lib/graphql/ItemQueries.gq';

	export async function load({ fetch, params }) {
		const { id } = params;
		const a = await getItemById({ fetch, variables: { id } });
		return {};
	}
</script>

<script>
	import { Heading, Text } from '@kahi-ui/framework';

	$: item = $queriedItem?.item;
</script>

<Heading is="h1">{item.name}</Heading>
<Text>Description: {item.description}</Text>
