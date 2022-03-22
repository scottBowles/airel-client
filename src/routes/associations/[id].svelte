<script context="module" lang="ts">
	import {
		getAssociationById,
		associationById as queriedAssociation
	} from '$lib/graphql/AssociationQueries.gq';

	export const load = async ({ fetch, params }) =>
		await getAssociationById({ fetch, variables: { id: params.id } });
</script>

<script>
	import { Layout } from '$lib/components/DetailPage';

	$: association = $queriedAssociation?.association;
</script>

<Layout
	name={association.name}
	properties={{ Description: association.description }}
	imageId={association.imageId}
/>
