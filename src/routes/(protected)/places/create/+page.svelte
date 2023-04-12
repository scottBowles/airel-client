<script lang="ts">
	import { fromGlobalId } from 'graphql-relay';
	import { error } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { CreatePlaceStore } from '$houdini';
	import { LayoutCreate } from '$lib/components/DetailPage';

	const createMutation = new CreatePlaceStore();

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const name = data.get('name')?.toString();
		const description = data.get('description')?.toString();
		const markdownNotes = data.get('markdownNotes')?.toString();
		const imageIds = data.get('imageIds')?.toString().split(',');

		if (!name) throw error(400, 'Name is required');

		const res = await createMutation.mutate({ name, description, markdownNotes, imageIds });

		if (res.data) {
			const { id: globalId } = res.data.createPlace;
			const { id } = fromGlobalId(globalId);
			goto(`/places/${id}`);
		} else {
			console.log('No data returned from createMutation.mutate! res.data: ', res.data);
		}
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutCreate />
</form>