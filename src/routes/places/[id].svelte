<script context="module" lang="ts">
	import { page } from '$app/stores';
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import BasicProperty from '$lib/components/DetailPage/BasicProperty.svelte';
	import { LockFailedError } from '$lib/errors';
	import {
		KQL_PlaceAddImage,
		KQL_PlaceById,
		KQL_PlaceLock,
		KQL_PlacePatch
	} from '$lib/graphql/_kitql/graphqlStores';
	import { Text } from '@kahi-ui/framework';
	import { KitQLInfo } from '@kitql/all-in';

	export const load = async ({ fetch, params }) => {
		await KQL_PlaceById.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script>
	const { id } = $page.params;
	const variables = { id }; // for requests

	$: ({ status, errors, data } = $KQL_PlaceById);
	$: ({ place } = data || {});
	$: ({ name, imageIds, description, markdownNotes, lockUser, lockedBySelf } = place || {});
	$: console.log({ place });

	function patchStore(patch) {
		const update = { place: { ...place, ...patch } };
		KQL_PlaceById.patch(update, variables);
	}

	function refreshFromNetwork() {
		KQL_PlaceById.query({ variables, settings: { policy: 'cache-and-network' } });
	}

	async function onEditClick() {
		const lockRes = await KQL_PlaceLock.mutate({ variables });
		if (lockRes.errors) {
			refreshFromNetwork();
			// notify error rather than throwing error
			// return;
			throw new LockFailedError(lockRes.errors[0].message);
		}
		patchStore(lockRes.data.placeLock.place);
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

		const { data, errors: resErrors } = await KQL_PlacePatch.mutate({
			variables: { id, ...patch }
		});

		if (resErrors) {
			// handle resErrors
		}
		const { place: updatedPlace, errors, ok } = data.placePatch;
		if (ok) {
			patchStore(updatedPlace);
		}
		// handle errors
	}

	async function onImageUpload(error, result) {
		if (error) {
			// handle error
			// console.log('handleImageUpload', { error });
		}
		if (result?.event === 'success') {
			const { data, errors: resErrors } = await KQL_PlaceAddImage.mutate({
				variables: {
					id,
					imageId: result.info.public_id
				}
			});
			if (resErrors) {
				// handle resErrors
			}
			const { place, errors, ok } = data.placeAddImage;
			if (ok) {
				// console.log({ place });
				patchStore(place);
				// console.log('post patch', $KQL_PlaceById);
			}
		}
	}
</script>

<StatusHandler {status} {errors} value={place} entityName="place">
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
					{#if place.lockedBySelf}
						<input name="description" value={place.description} />
					{:else}
						{place.description}
					{/if}
				</Text>
			</BasicProperty>
		</svelte:fragment>
	</Layout>
</StatusHandler>
<!-- <KitQLInfo store={KQL_PlaceById} /> -->
