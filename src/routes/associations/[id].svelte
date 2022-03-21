<script context="module" lang="ts">
	import {
		getAssociationById,
		associationById as queriedAssociation
	} from '$lib/graphql/AssociationQueries.gq';

	export const load = async ({ fetch, params }) =>
		await getAssociationById({ fetch, variables: { id: params.id } });
</script>

<script>
	import { Container, Heading, Text } from '@kahi-ui/framework';

	import LargeImage from '$lib/components/LargeImage.svelte';

	$: association = $queriedAssociation?.association;
</script>

<div class="spacer" />
<Container>
	<Heading is="h1">{association.name}</Heading>
	<div class="spacer" />
	<div class="img-container">
		<LargeImage alt={association.name} />
	</div>
	<Heading is="h3">Description</Heading>
	<div class="spacer-sm" />
	<Text>{association.description}</Text>
</Container>

<style>
	.spacer {
		height: 2em;
	}
	.spacer-sm {
		height: 1em;
	}
	.img-container {
		float: right;
		width: clamp(40%, (120px - 40%) * 1000, 100%);
		margin-left: 0.5em;
		margin-bottom: 0.5em;
	}
</style>
