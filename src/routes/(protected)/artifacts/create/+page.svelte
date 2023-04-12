<script lang="ts">
	import { fromGlobalId } from 'graphql-relay';
	import { error } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { CreateArtifactStore } from '$houdini';
	import { LayoutCreate } from '$lib/components/DetailPage';

	const createMutation = new CreateArtifactStore();

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const name = data.get('name')?.toString();
		const description = data.get('description')?.toString();
		const markdownNotes = data.get('markdownNotes')?.toString();
		const imageIds = data.get('imageIds')?.toString().split(',');

		if (!name) throw error(400, 'Name is required');

		const res = await createMutation.mutate({ name, description, markdownNotes, imageIds });

		if (res.data) {
			const { id: globalId } = res.data.createArtifact;
			const { id } = fromGlobalId(globalId);
			goto(`/artifacts/${id}`);
		} else {
			console.log('No data returned from createMutation.mutate! res.data: ', res.data);
		}
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutCreate />
</form>
