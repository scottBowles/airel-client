<script context="module" lang="ts">
	import { page } from '$app/stores';
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import BasicProperty from '$lib/components/DetailPage/BasicProperty.svelte';
	import { LockFailedError } from '$lib/errors';
	import {
		KQL_NpcAddImage,
		KQL_NpcById,
		KQL_NpcLock,
		KQL_NpcPatch
	} from '$lib/graphql/_kitql/graphqlStores';
	import { Text } from '@kahi-ui/framework';
	import { KitQLInfo } from '@kitql/all-in';

	export const load = async ({ fetch, params }) => {
		await KQL_NpcById.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script>
	const { id } = $page.params;
	const variables = { id }; // for requests

	$: ({ status, errors, data } = $KQL_NpcById);
	$: ({ npc } = data || {});
	$: ({ name, imageIds, description, markdownNotes, lockUser, lockedBySelf } = npc || {});

	function patchStore(patch) {
		const update = { npc: { ...npc, ...patch } };
		KQL_NpcById.patch(update, variables);
	}

	function refreshFromNetwork() {
		KQL_NpcById.query({ variables, settings: { policy: 'cache-and-network' } });
	}

	async function onEditClick() {
		const lockRes = await KQL_NpcLock.mutate({ variables });
		if (lockRes.errors) {
			refreshFromNetwork();
			// notify error rather than throwing error
			// return;
			throw new LockFailedError(lockRes.errors[0].message);
		}
		patchStore(lockRes.data.npcLock.npc);
		return;
	}

	async function onFormSubmit(e) {
		const form = e.target;
		const formData = new FormData(form);
		const patch = {};
		formData.forEach((value, key) => {
			patch[key] = value;
		});
		console.log({ patch });

		const { data, errors: resErrors } = await KQL_NpcPatch.mutate({
			variables: { id, ...patch }
		});

		if (resErrors) {
			// handle resErrors
		}
		const { npc: updatedNpc, errors, ok } = data.npcPatch;
		if (ok) {
			patchStore(updatedNpc);
		}
		// handle errors
	}

	async function onImageUpload(error, result) {
		if (error) {
			// handle error
			// console.log('handleImageUpload', { error });
		}
		if (result?.event === 'success') {
			const { data, errors: resErrors } = await KQL_NpcAddImage.mutate({
				variables: {
					id,
					imageId: result.info.public_id
				}
			});
			if (resErrors) {
				// handle resErrors
			}
			const { npc, errors, ok } = data.npcAddImage;
			if (ok) {
				// console.log({ npc });
				patchStore(npc);
				// console.log('post patch', $KQL_NpcById);
			}
		}
	}
</script>

<StatusHandler {status} {errors} value={npc} entityName="npc">
	<Layout
		{name}
		{imageIds}
		{markdownNotes}
		{lockUser}
		{lockedBySelf}
		properties={{
			Description: description
		}}
		{onEditClick}
		{onFormSubmit}
		{onImageUpload}
	>
		<svelte:fragment slot="properties">
			<BasicProperty name="Description">
				<Text>
					{#if npc.lockedBySelf}
						<input name="description" value={npc.description} />
					{:else}
						{npc.description}
					{/if}
				</Text>
			</BasicProperty>
		</svelte:fragment>
	</Layout>
</StatusHandler>
<!-- <KitQLInfo store={KQL_NpcById} /> -->
