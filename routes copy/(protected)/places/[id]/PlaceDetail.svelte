<script lang="ts">
	import { fragment, graphql, type PlaceDetailFields } from '$houdini';
	import { LayoutDisplay } from '$lib/components/DetailPage';
	import Spacer from '$lib/components/Spacer.svelte';
	import { capitalize, idFromGlobalId } from '$lib/utils';
	import Breadcrumbs from '../Breadcrumbs.svelte';
	import { getChildrenName } from '../utils';

	export let place: PlaceDetailFields;

	$: data = fragment(
		place,
		graphql(`
			fragment PlaceDetailFields on Place {
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

	$: ({ placeType, children: childrenConnection } = $data);
	$: placeTypeDisplay = placeType ? capitalize(placeType) : '';
	$: children = childrenConnection?.edges?.map((edge) => edge.node) || [];
</script>

<Breadcrumbs place={$data} />
<LayoutDisplay entity={$data}>
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
					<a class="link link-accent link-hover" href={`/places/${idFromGlobalId(child.id)}`}>
						{child.name}
					</a>
					{i < children.length - 1 ? ', ' : ''}
				{/each}
			</div>
			<Spacer lg />
		{/if}
	</svelte:fragment>
</LayoutDisplay>
