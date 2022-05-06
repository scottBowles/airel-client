<script context="module" lang="ts">
	import { page } from '$app/stores';
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import BasicProperty from '$lib/components/DetailPage/BasicProperty.svelte';
	import { LockFailedError } from '$lib/errors';
	import {
		KQL_ArtifactAddImage,
		KQL_ArtifactById,
		KQL_ArtifactLock,
		KQL_ArtifactPatch
	} from '$lib/graphql/_kitql/graphqlStores';
	import { Text } from '@kahi-ui/framework';
	import { KitQLInfo } from '@kitql/all-in';
	import DetailBase from './_DetailBase.svelte';

	export const load = async ({ fetch, params }) => {
		await KQL_ArtifactById.queryLoad({ fetch, variables: { id: params.id } });
		return {};
	};
</script>

<script>
	const { id } = $page.params;
	const variables = { id }; // for requests

	$: ({ status, errors, data } = $KQL_ArtifactById);
	$: ({ artifact } = data || {});

	function patchStore(patch) {
		const update = { artifact: { ...artifact, ...patch } };
		KQL_ArtifactById.patch(update, variables);
	}

	function refreshFromNetwork() {
		KQL_ArtifactById.query({ variables, settings: { policy: 'cache-and-network' } });
	}

	async function onEditClick() {
		const lockRes = await KQL_ArtifactLock.mutate({ variables });
		if (lockRes.errors) {
			refreshFromNetwork();
			// notify error rather than throwing error
			// return;
			throw new LockFailedError(lockRes.errors[0].message);
		}
		patchStore(lockRes.data.artifactLock.artifact);
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

		const { data, errors: resErrors } = await KQL_ArtifactPatch.mutate({
			variables: { id, ...patch }
		});

		if (resErrors) {
			// handle resErrors
		}
		const { artifact: updatedArtifact, errors, ok } = data.artifactPatch;
		if (ok) {
			patchStore(updatedArtifact);
		}
		// handle errors
	}

	async function onImageUpload(error, result) {
		if (error) {
			// handle error
			// console.log('handleImageUpload', { error });
		}
		if (result?.event === 'success') {
			const { data, errors: resErrors } = await KQL_ArtifactAddImage.mutate({
				variables: {
					id,
					imageId: result.info.public_id
				}
			});
			if (resErrors) {
				// handle resErrors
			}
			const { artifact, errors, ok } = data.artifactAddImage;
			if (ok) {
				// console.log({ artifact });
				patchStore(artifact);
				// console.log('post patch', $KQL_ArtifactById);
			}
		}
	}
</script>

<DetailBase {artifact} {status} {errors} {onEditClick} {onFormSubmit} {onImageUpload} />
<!-- <KitQLInfo store={KQL_ArtifactById} /> -->
