<script context="module" lang="ts">
	import {
		getAssociationById,
		associationById as queriedAssociation
	} from '$lib/graphql/AssociationQueries.gq';
	import { withToken } from '$lib/utils';

	export const load = async ({ fetch, session, params }) =>
		await getAssociationById({
			fetch: withToken(fetch, session),
			variables: { id: params.id }
		});
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
