<script lang="ts">
	import { goto } from '$app/navigation';
	import { CreateRaceStore } from '$houdini';
	import { LayoutCreate } from '$lib/components/DetailPage';
	import { error } from '@sveltejs/kit';
	import { parseFormData } from 'parse-nested-form-data';

	const createMutation = new CreateRaceStore();

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		const name = parsed.name as string | undefined;

		if (!name) error(400, 'Name is required');

		const res = await createMutation.mutate({ ...parsed, name });

		if (res.data?.createRace.__typename === 'Race') {
			const { id } = res.data.createRace;
			goto(`/races/${id}`);
		} else {
			console.log('No data returned from createMutation.mutate! res.data: ', res.data);
		}
	};
</script>

<form method="POST" onsubmit={handleSubmit}>
	<LayoutCreate />
</form>
