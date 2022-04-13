<script context="module" lang="ts">
	import {
		getAssociationById,
		associationById as queriedAssociation
	} from '$lib/graphql/AssociationQueries.gq';

	export const load = async ({ fetch, params }) =>
		await getAssociationById({
			variables: { id: params.id },
			fetch
		});
</script>

<script>
	import { Layout, StatusHandler } from '$lib/components/DetailPage';

	$: ({ gQueryStatus, association, errors } = $queriedAssociation);
	$: console.log({ association });
</script>

<StatusHandler status={gQueryStatus} {errors} value={association} entityName="association">
	<Layout
		name={association.name}
		properties={{
			Description: association.description
		}}
		markdownNotes={association.markdownNotes}
		imageId={association.imageId}
	/>
</StatusHandler>
