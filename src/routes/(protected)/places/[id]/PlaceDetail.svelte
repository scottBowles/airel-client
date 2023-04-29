<script lang="ts">
	import { fragment, graphql, PlaceLockStore, type PlaceDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';
	import Spacer from '$lib/components/Spacer.svelte';
	import { capitalize } from '$lib/utils';
	import Breadcrumbs from '../Breadcrumbs.svelte';
	import { getChildrenName } from '../utils';

	const lockForEditMutation = new PlaceLockStore();

	export let place: PlaceDetailFields;

	$: data = fragment(
		place,
		graphql(`
			fragment PlaceDetailFields on Place {
				id
				placeType
				children {
					edges {
						node {
							id
							name
						}
					}
				}
				...PlaceBreadcrumbFields
				...EntityDetailFields
			}
		`)
	);

	$: ({ id, placeType, children: childrenConnection } = $data);
	$: placeTypeDisplay = placeType ? capitalize(placeType) : '';
	$: children = childrenConnection?.edges?.map((edge) => edge.node) || [];

	const onEditClick = () => lockForEditMutation.mutate({ id });
</script>

<Breadcrumbs place={$data} />
<LayoutDisplay entity={$data} {onEditClick}>
	<svelte:fragment slot="properties">
		<Spacer lg />
		{#if placeTypeDisplay}
			<div class="items-container">
				<h2 class="text-xl font-bold">{placeTypeDisplay}</h2>
			</div>
			<Spacer lg />
		{/if}
		{#if children?.length > 0}
			<div class="items-container">
				<h2 class="text-xl font-bold">{getChildrenName(placeTypeDisplay)}</h2>
				<Spacer xs />
				{#each children as child, i}
					<a class="link link-accent link-hover" href={`/places/${child.id}`}>
						{child.name}
					</a>
					{i < children.length - 1 ? ', ' : ''}
				{/each}
			</div>
			<Spacer lg />
		{/if}
	</svelte:fragment>
</LayoutDisplay>
