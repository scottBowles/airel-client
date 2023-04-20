<script lang="ts">
	import { fragment, graphql, ArtifactLockStore, type ArtifactDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';

	const lockForEditMutation = new ArtifactLockStore();

	export let artifact: ArtifactDetailFields;

	$: data = fragment(
		artifact,
		graphql(`
			fragment ArtifactDetailFields on Artifact {
				id
				...EntityDetailFields
			}
		`)
	);

	$: ({ id } = $data);

	const onEditClick = () => lockForEditMutation.mutate({ id });
</script>

<LayoutDisplay entity={$data} {onEditClick} />
