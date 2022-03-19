<script context="module" lang="ts">
	import {
		getAssociationById,
		associationById as queriedAssociation
	} from '$lib/graphql/AssociationQueries.gq';

	export async function load({ fetch, params }) {
		const { id } = params;
		const a = await getAssociationById({ fetch, variables: { id } });
		return {};
	}
</script>

<script>
	import { Heading, Text } from '@kahi-ui/framework';

	$: association = $queriedAssociation?.association;
</script>

<Heading is="h1">{association.name}</Heading>
<Text>Description: {association.description}</Text>
