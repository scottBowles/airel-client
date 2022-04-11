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
	import { Layout, StatusHandler } from '$lib/components/DetailPage';

	$: ({ gQueryStatus, association, errors } = $queriedAssociation);
</script>

<StatusHandler status={gQueryStatus} {errors} value={association} entityName="association">
	<Layout
		name={association.name}
		properties={{ Description: association.description }}
		imageId={association.imageId}
	/>
</StatusHandler>
