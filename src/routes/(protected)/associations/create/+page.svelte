<script lang="ts">
	import { goto } from '$app/navigation';
	import { graphql } from '$houdini';
	import { LayoutCreate } from '$lib/components/DetailPage';
	import { error } from '@sveltejs/kit';
	import { fromGlobalId } from 'graphql-relay';

	const createMutation = graphql(`
		mutation CreateAssociation($name: String!, $description: String, $markdownNotes: String) {
			createAssociation(
				input: { name: $name, description: $description, markdownNotes: $markdownNotes }
			) {
				... on Association {
					id
				}
			}
		}
	`);

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const name = data.get('name')?.toString();
		const description = data.get('description')?.toString();
		const markdownNotes = data.get('markdownNotes')?.toString();

		if (!name) throw error(400, 'Name is required');

		const res = await createMutation.mutate({ name, description, markdownNotes });

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
