<script lang="ts">
	import { goto } from '$app/navigation';
	import { CreatePlaceStore, PlacesForSearchStore, type PlaceType$options } from '$houdini';
	import { LayoutCreate } from '$lib/components/DetailPage';
	import Spacer from '$lib/components/Spacer.svelte';
	import { capitalize, fromGlobalId } from '$lib/utils';
	import { error } from '@sveltejs/kit';
	import { parseFormData } from 'parse-nested-form-data';
	import { onMount } from 'svelte';
	import ChildrenMultiSelect from '../ChildrenMultiSelect.svelte';
	import ParentSelect from '../ParentSelect.svelte';
	import PlaceTypeSelect from '../PlaceTypeSelect.svelte';
	import { filterForChildren, filterForParent, getSelectOptionFromEdge } from '../utils';

	const createMutation = new CreatePlaceStore();
	const placesForSearchQuery = new PlacesForSearchStore();
	onMount(() => placesForSearchQuery.fetch());

	let name = $state('');
	let selectedPlaceType: PlaceType$options | null = $state(null);
	let selectedPlaceTypeDisplay = $derived(selectedPlaceType ? capitalize(selectedPlaceType) : '');

	let placesForChildrenSelect = $derived(
		$placesForSearchQuery.data && selectedPlaceType
			? $placesForSearchQuery.data.places.edges
					.filter(filterForChildren(selectedPlaceType))
					.map(getSelectOptionFromEdge)
			: []
	);

	let placesForParentSelect = $derived(
		$placesForSearchQuery.data && selectedPlaceType
			? [
					...$placesForSearchQuery.data.places.edges
						.filter(filterForParent(selectedPlaceType))
						.map(getSelectOptionFromEdge)
				]
			: []
	);

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		const name = parsed.name as string | undefined;

		if (!name) error(400, 'Name is required');

		const res = await createMutation.mutate({ ...parsed, name });

		if (res.data?.createPlace.__typename === 'Place') {
			const { id: globalId } = res.data.createPlace;
			const { id } = fromGlobalId(globalId);
			goto(`/places/${id}`);
		} else {
			console.log('No data returned from createMutation.mutate! res.data: ', res.data);
		}
	};
</script>

<form method="POST" onsubmit={handleSubmit}>
	<LayoutCreate bind:name>
		{#snippet properties()}
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
		{/snippet}
	</LayoutCreate>
</form>
