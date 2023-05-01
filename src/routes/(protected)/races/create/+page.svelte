<script lang="ts">
	import { fromGlobalId } from 'graphql-relay';
	import { parseFormData } from 'parse-nested-form-data';
	import { error } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { CreateRaceStore } from '$houdini';
	import { LayoutCreate } from '$lib/components/DetailPage';

	const createMutation = new CreateRaceStore();

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		const name = parsed.name as string | undefined;

		if (!name) throw error(400, 'Name is required');

		const res = await createMutation.mutate({ ...parsed, name });

		if (res.data) {
			const { id: globalId } = res.data.createRace;
			const { id } = fromGlobalId(globalId);
			goto(`/races/${id}`);
		} else {
			console.log('No data returned from createMutation.mutate! res.data: ', res.data);
		}
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutCreate />
</form>
