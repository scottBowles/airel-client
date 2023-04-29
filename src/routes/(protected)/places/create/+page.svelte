<script lang="ts">
	import { fromGlobalId } from 'graphql-relay';
	import { parseFormData } from 'parse-nested-form-data';
	import { error } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { CreatePlaceStore, PlacesForSearchStore, type PlaceType$options } from '$houdini';
	import { LayoutCreate } from '$lib/components/DetailPage';
	import Spacer from '$lib/components/Spacer.svelte';
	import PlaceTypeSelect from '../PlaceTypeSelect.svelte';
	import ParentSelect from '../ParentSelect.svelte';
	import ChildrenMultiSelect from '../ChildrenMultiSelect.svelte';
	import { browser } from '$app/environment';
	import { filterForChildren, filterForParent, getSelectOptionFromEdge } from '../utils';
	import { capitalize } from '$lib/utils';

	const createMutation = new CreatePlaceStore();
	const placesForSearchQuery = new PlacesForSearchStore();
	$: browser && placesForSearchQuery.fetch();

	let name: string = '';
	let selectedPlaceType: PlaceType$options | null = null;
	$: selectedPlaceTypeDisplay = selectedPlaceType ? capitalize(selectedPlaceType) : '';

	$: placesForChildrenSelect =
		$placesForSearchQuery.data && selectedPlaceType
			? $placesForSearchQuery.data.places.edges
					.filter(filterForChildren(selectedPlaceType))
					.map(getSelectOptionFromEdge)
			: [];

	$: placesForParentSelect =
		$placesForSearchQuery.data && selectedPlaceType
			? [
					...$placesForSearchQuery.data.places.edges
						.filter(filterForParent(selectedPlaceType))
						.map(getSelectOptionFromEdge)
			  ]
			: [];

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		const name = data.get('name')?.toString();
		const imageIds = data.get('imageIds')?.toString().split(',').filter(Boolean);
		const logs = data.get('logs')?.toString().split(',').filter(Boolean);

		if (!name) throw error(400, 'Name is required');

		const res = await createMutation.mutate({ name, imageIds, logs, ...parsed });

		if (res.data) {
			const { id: globalId } = res.data.createPlace;
			const { id } = fromGlobalId(globalId);
			goto(`/places/${id}`);
		} else {
			console.log('No data returned from createMutation.mutate! res.data: ', res.data);
		}
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<LayoutCreate bind:name>
		<svelte:fragment slot="properties">
			<Spacer lg />

			<PlaceTypeSelect bind:selectedPlaceType />
			<Spacer lg />

			<i class="small-text"
				>Note: In general, the hierarchy of places is:<br />
				Stars &gt; Planets &gt; Moons &gt; Regions &gt; Towns &gt; Districts &gt; Locations<br />
			</i>
			<Spacer xs />

			{#if selectedPlaceTypeDisplay && placesForParentSelect.length > 0}
				<ParentSelect {name} {selectedPlaceTypeDisplay} {placesForParentSelect} />
				<Spacer lg />
			{/if}

			{#if placesForChildrenSelect.length > 0 && selectedPlaceTypeDisplay}
				<ChildrenMultiSelect {placesForChildrenSelect} {selectedPlaceTypeDisplay} />
				<Spacer lg />
			{/if}
		</svelte:fragment>
	</LayoutCreate>
</form>
