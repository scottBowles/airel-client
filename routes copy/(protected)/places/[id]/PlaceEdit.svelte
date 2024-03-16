<script lang="ts">
	import { parseFormData } from 'parse-nested-form-data';
	import { browser } from '$app/environment';
	import {
		fragment,
		graphql,
		UpdatePlaceStore,
		PlacesForSearchStore,
		type PlaceEditFields
	} from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';
	import Spacer from '$lib/components/Spacer.svelte';
	import { capitalize } from '$lib/utils';
	import ChildrenMultiSelect from '../ChildrenMultiSelect.svelte';
	import ParentSelect from '../ParentSelect.svelte';
	import Breadcrumbs from '../Breadcrumbs.svelte';
	import { filterForChildren, filterForParent, getSelectOptionFromEdge } from '../utils';
	import PlaceTypeSelect from '../PlaceTypeSelect.svelte';

	const updatePlace = new UpdatePlaceStore();
	const placesForSearchQuery = new PlacesForSearchStore();
	$: browser && placesForSearchQuery.fetch();

	export let place: PlaceEditFields;

	$: data = fragment(
		place,
		graphql(`
			fragment PlaceEditFields on Place {
				id
				name
				placeType
				children {
					edges {
						node {
							id
							name
						}
					}
				}
				parent {
					id
				}
				...PlaceBreadcrumbFields
				...EntityEditFields
			}
		`)
	);

	$: ({ id, name, placeType, children: childrenConnection, parent } = $data);

	$: selectedPlaceType = placeType;
	$: selectedPlaceTypeDisplay = selectedPlaceType ? capitalize(selectedPlaceType) : '';
	$: children = childrenConnection?.edges?.map((edge) => edge.node) || [];
	$: childrenIds = children.map((child) => child.id);

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

	const handleSubmit = async (event: SubmitEvent) => {
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		updatePlace.mutate({ id, ...parsed });
	};
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<Breadcrumbs place={$data} />
	<LayoutEdit entity={$data}>
		<svelte:fragment slot="properties">
			<Spacer lg />

			<PlaceTypeSelect {id} bind:selectedPlaceType />
			<Spacer lg />

			<i class="small-text"
				>Note: In general, the hierarchy of places is:<br />
				Stars &gt; Planets &gt; Moons &gt; Regions &gt; Towns &gt; Districts &gt; Locations<br />
			</i>
			<Spacer xs />

			{#if selectedPlaceTypeDisplay && placesForParentSelect.length > 0}
				<ParentSelect {name} {selectedPlaceTypeDisplay} {placesForParentSelect} {parent} />
				<Spacer lg />
			{/if}

			{#if placesForChildrenSelect.length > 0 && selectedPlaceTypeDisplay}
				<ChildrenMultiSelect {placesForChildrenSelect} {childrenIds} {selectedPlaceTypeDisplay} />
				<Spacer lg />
			{/if}
		</svelte:fragment>
	</LayoutEdit>
</form>
