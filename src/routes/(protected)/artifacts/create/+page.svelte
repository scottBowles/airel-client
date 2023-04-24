<script lang="ts">
	import { fromGlobalId } from 'graphql-relay';
	import { error } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { CreateArtifactStore } from '$houdini';
	import { LayoutCreate } from '$lib/components/DetailPage';
	import RelatedItemSelect from '$lib/components/RelatedItemSelect.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { parseFormData } from 'parse-nested-form-data';

	const createMutation = new CreateArtifactStore();

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		const name = parsed.name as string | undefined;
		const imageIds = data.get('imageIds')?.toString().split(',').filter(Boolean);
		const logs = data.get('logs')?.toString().split(',').filter(Boolean);

		if (!name) throw error(400, 'Name is required');

		const res = await createMutation.mutate({ ...parsed, name, imageIds, logs });

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
	<LayoutCreate>
		<svelte:fragment slot="properties">
			<Spacer lg />
			<RelatedItemSelect />
		</svelte:fragment>
	</LayoutCreate>
</form>
