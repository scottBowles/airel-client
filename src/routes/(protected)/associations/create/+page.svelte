<script lang="ts">
	import { fromGlobalId } from 'graphql-relay';
	import { error } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { CreateAssociationStore } from '$houdini';
	import { LayoutCreate } from '$lib/components/DetailPage';

	const createMutation = new CreateAssociationStore();

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const name = data.get('name')?.toString();
		const description = data.get('description')?.toString();
		const markdownNotes = data.get('markdownNotes')?.toString();
		const imageIds = data.get('imageIds')?.toString().split(',').filter(Boolean);
		const logs = data.get('logs')?.toString().split(',').filter(Boolean);

		if (!name) throw error(400, 'Name is required');

		const res = await createMutation.mutate({ name, description, markdownNotes, imageIds, logs });

		if (res.data) {
			const { id: globalId } = res.data.createAssociation;
			const { id } = fromGlobalId(globalId);
			goto(`/associations/${id}`);
		} else {
			console.log('No data returned from createMutation.mutate! res.data: ', res.data);
		}
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutCreate />
</form>
