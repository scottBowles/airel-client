<script lang="ts">
	import {
		fragment,
		graphql,
		PlacesForSearchStore,
		UpdatePlaceStore,
		type PlaceEditFields
	} from '$houdini';
	import { LayoutEdit } from '$lib/components/DetailPage';
	import Spacer from '$lib/components/Spacer.svelte';
	import { capitalize } from '$lib/utils';
	import { parseFormData } from 'parse-nested-form-data';
	import { onMount } from 'svelte';
	import Breadcrumbs from '../Breadcrumbs.svelte';
	import ChildrenMultiSelect from '../ChildrenMultiSelect.svelte';
	import ParentSelect from '../ParentSelect.svelte';
	import PlaceTypeSelect from '../PlaceTypeSelect.svelte';
	import { filterForChildren, filterForParent, getSelectOptionFromEdge } from '../utils';

	const updatePlace = new UpdatePlaceStore();
	const placesForSearchQuery = new PlacesForSearchStore();
	onMount(() => placesForSearchQuery.fetch());

	interface Props {
		place: PlaceEditFields;
	}

	let { place }: Props = $props();

	let data = $derived(
		fragment(
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
		)
	);

	let { id, name, placeType, children: childrenConnection, parent } = $derived($data);

	let selectedPlaceType = $derived(placeType);
	let selectedPlaceTypeDisplay = $derived(selectedPlaceType ? capitalize(selectedPlaceType) : '');
	let children = $derived(childrenConnection?.edges?.map((edge) => edge.node) || []);
	let childrenIds = $derived(children.map((child) => child.id));

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

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		updatePlace.mutate({ id, ...parsed });
	};
</script>

<form method="POST" onsubmit={handleSubmit}>
	<Breadcrumbs place={$data} />
	<LayoutEdit entity={$data}>
		{#snippet properties()}
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
		{/snippet}
	</LayoutEdit>
</form>
