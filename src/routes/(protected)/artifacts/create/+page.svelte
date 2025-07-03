<script lang="ts">
	import { goto } from '$app/navigation';
	import { CreateArtifactStore } from '$houdini';
	import { LayoutCreate } from '$lib/components/DetailPage';
	import RelatedItemMultiSelect from '$lib/components/RelatedItemMultiSelect.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { error } from '@sveltejs/kit';
	import { parseFormData } from 'parse-nested-form-data';

	const createMutation = new CreateArtifactStore();

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		const name = parsed.name as string | undefined;

		if (!name) error(400, 'Name is required');

		const res = await createMutation.mutate({ ...parsed, name });

		if (res.data?.createArtifact.__typename === 'Artifact') {
			const { id } = res.data.createArtifact;
			goto(`/artifacts/${id}`);
		} else {
			console.log('No data returned from createMutation.mutate! res.data: ', res.data);
		}
	};
</script>

<form method="POST" onsubmit={handleSubmit}>
	<LayoutCreate>
		{#snippet properties()}
			<Spacer lg />
			<RelatedItemMultiSelect />
		{/snippet}
	</LayoutCreate>
</form>
