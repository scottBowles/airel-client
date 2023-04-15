<script lang="ts">
	import { fragment, graphql, RaceLockStore, type RaceDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';

	const lockForEditMutation = new RaceLockStore();

	export let race: RaceDetailFields;
	export let onImageUpload: (error: any, result: any) => Promise<void>;
	export let onLogAddition: (logUrl: string) => Promise<void>;
	export let onLogRemoval: (logId: string) => Promise<void>;

	$: data = fragment(
		race,
		graphql(`
			fragment RaceDetailFields on Race {
				id
				name
				description
				imageIds
				thumbnailId
				markdownNotes
				lockUser {
					id
					username
				}
				lockTime
				logs {
					edges {
						node {
							id
							url
							name
						}
					}
				}
			}
		`)
	);

	$: ({ id, name, description, markdownNotes, logs, imageIds = [], lockUser } = $data);

	const onEditClick = () => lockForEditMutation.mutate({ id });
</script>

<LayoutDisplay
	{name}
	{description}
	{markdownNotes}
	{logs}
	{imageIds}
	{lockUser}
	{onEditClick}
	{onImageUpload}
	{onLogAddition}
	{onLogRemoval}
/>
