<script lang="ts">
	import { fromGlobalId } from '$lib/utils';
	import { error } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { CreateArtifactStore } from '$houdini';
	import { LayoutCreate } from '$lib/components/DetailPage';
	import RelatedItemMultiSelect from '$lib/components/RelatedItemMultiSelect.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { parseFormData } from 'parse-nested-form-data';

	const createMutation = new CreateArtifactStore();

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		const name = parsed.name as string | undefined;

		if (!name) error(400, 'Name is required');

		const res = await createMutation.mutate({ ...parsed, name });

		if (res.data?.createArtifact.__typename === 'Artifact') {
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
			<RelatedItemMultiSelect />
		</svelte:fragment>
	</LayoutCreate>
</form>
