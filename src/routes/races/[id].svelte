<script context="module" lang="ts">
	import { page } from '$app/stores';
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import BasicProperty from '$lib/components/DetailPage/BasicProperty.svelte';
	import { LockFailedError } from '$lib/errors';
	import {
		KQL_RaceAddImage,
		KQL_RaceById,
		KQL_RaceLock,
		KQL_RacePatch
	} from '$lib/graphql/_kitql/graphqlStores';
	import { Text } from '@kahi-ui/framework';
	import { KitQLInfo } from '@kitql/all-in';
	import DetailBase from './_DetailBase.svelte';

	export const load = async ({ fetch, params }) => {
		await KQL_RaceById.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script>
	const { id } = $page.params;
	const variables = { id }; // for requests

	$: ({ status, errors, data } = $KQL_RaceById);
	$: ({ race } = data || {});

	function patchStore(patch) {
		const update = { race: { ...race, ...patch } };
		KQL_RaceById.patch(update, variables);
	}

	function refreshFromNetwork() {
		KQL_RaceById.query({ variables, settings: { policy: 'cache-and-network' } });
	}

	async function onEditClick() {
		const lockRes = await KQL_RaceLock.mutate({ variables });
		if (lockRes.errors) {
			refreshFromNetwork();
			// notify error rather than throwing error
			// return;
			throw new LockFailedError(lockRes.errors[0].message);
		}
		patchStore(lockRes.data.raceLock.race);
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

		const { data, errors: resErrors } = await KQL_RacePatch.mutate({
			variables: { id, ...patch }
		});

		if (resErrors) {
			// handle resErrors
		}
		const { race: updatedRace, errors, ok } = data.racePatch;
		if (ok) {
			patchStore(updatedRace);
		}
		// handle errors
	}

	async function onImageUpload(error, result) {
		if (error) {
			// handle error
			// console.log('handleImageUpload', { error });
		}
		if (result?.event === 'success') {
			const { data, errors: resErrors } = await KQL_RaceAddImage.mutate({
				variables: {
					id,
					imageId: result.info.public_id
				}
			});
			if (resErrors) {
				// handle resErrors
			}
			const { race, errors, ok } = data.raceAddImage;
			if (ok) {
				// console.log({ race });
				patchStore(race);
				// console.log('post patch', $KQL_RaceById);
			}
		}
	}
</script>

<DetailBase {race} {status} {errors} {onEditClick} {onFormSubmit} {onImageUpload} />
<!-- <KitQLInfo store={KQL_RaceById} /> -->
