<script context="module" lang="ts">
	import { goto } from '$app/navigation';
	import { KQL_RaceCreate } from '$lib/graphql/_kitql/graphqlStores';
	import { somethingWentWrong } from '$lib/utils';
	import { KitQLInfo } from '@kitql/all-in';
	import DetailBase from './_DetailBase.svelte';
</script>

<script>
	let race = { imageIds: [] };

	async function onFormSubmit(e) {
		const variables = { ...race };
		const formData = new FormData(e.target);
		formData.forEach((value, key) => {
			variables[key] = value;
		});

		const { data, errors: resErrors } = await KQL_RaceCreate.mutate({
			variables
		});

		if (resErrors) {
			somethingWentWrong(resErrors[0].message);
			return;
		}

		const { race: newRace, errors, ok } = data.raceCreate;
		if (ok) {
			goto(`/races/${newRace.id}`);
		}
		if (errors) {
			somethingWentWrong(errors);
		}
	}

	async function onImageUpload(error, result) {
		if (error) {
			somethingWentWrong(JSON.stringify(error));
			return;
		}
		if (result?.event === 'success') {
			race.imageIds = [...race.imageIds, result.info.public_id];
		}
	}
</script>

<DetailBase creating {race} {onFormSubmit} {onImageUpload} />
<!-- <KitQLInfo store={KQL_RaceById} /> -->
