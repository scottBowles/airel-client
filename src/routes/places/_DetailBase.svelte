<script lang="ts">
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import Spacer from '$lib/components/Spacer.svelte';
	import { KQL_PlacesForSearch } from '$lib/graphql/_kitql/graphqlStores';
	import { emptySelectOption } from '$lib/utils';
	import {
		Anchor,
		Breadcrumb,
		Container,
		DataSelect,
		Form,
		Heading,
		Text
	} from '@kahi-ui/framework';
	import { onMount } from 'svelte';
	import { placeTypeOptions } from './_placeTypeOptions';
	import {
		filterForChildren,
		filterForParent,
		getChildrenName,
		getParentName
	} from './_typeRelations';

	export let onEditClick = () => {};
	export let onFormSubmit;
	export let onImageUpload;
	export let place = undefined;
	export let form;
	export let status = undefined;
	export let errors = [];
	export let creating = false;
	export let patchStore;

	onMount(KQL_PlacesForSearch.query);

	$: ({
		id,
		name,
		description,
		markdownNotes,
		logs,
		placeTypeDisplay,
		// parent,
		children: childrenConnection,
		imageIds = [],
		lockUser,
		lockedBySelf
	} = place || {});

	type TEdge = { node: { id: string; name: string; placeTypeDisplay: string } };

	function getSelectOptionFromEdge({ node }: TEdge) {
		return {
			text: node.name + ' (' + node.placeTypeDisplay + ')',
			id: node.id
		};
	}

	$: children = childrenConnection?.edges?.map((edge) => edge.node) || [];

	function getBreadcrumbs(node): any[] {
		return node ? [...getBreadcrumbs(node.parent), node] : [];
	}
	$: breadcrumbs = getBreadcrumbs(place);

	$: placesForParentSelect =
		$KQL_PlacesForSearch.data && $form.placeType
			? [
					emptySelectOption,
					...$KQL_PlacesForSearch.data.places.edges
						.filter(filterForParent($form.placeType))
						.map(getSelectOptionFromEdge)
			  ]
			: [];
	$: placesForChildrenSelect =
		$KQL_PlacesForSearch.data && $form.placeType
			? $KQL_PlacesForSearch.data.places.edges
					.filter(filterForChildren($form.placeType))
					.map(getSelectOptionFromEdge)
			: [];

	$: editing = lockedBySelf || creating;
</script>

<StatusHandler {status} {errors} value={place} entityName="place">
	<Spacer xs />
	{#if breadcrumbs.length > 0}
		<Container>
			<Breadcrumb.Container>
				{#each breadcrumbs as breadcrumb, i}
					<Breadcrumb.Anchor
						sveltekit:prefetch
						href={`/places/${breadcrumb.id}`}
						active={i === breadcrumbs.length - 1}
					>
						{breadcrumb.name}
					</Breadcrumb.Anchor>
				{/each}
			</Breadcrumb.Container>
		</Container>
	{/if}
	<Layout
		{id}
		{form}
		{name}
		{description}
		{markdownNotes}
		{logs}
		{imageIds}
		{lockUser}
		{lockedBySelf}
		{onEditClick}
		{onFormSubmit}
		{onImageUpload}
		{patchStore}
		{creating}
	>
		<svelte:fragment slot="properties">
			<Spacer lg />
			{#if editing}
				<div class="spacer" />
				<Form.Label>Place Type</Form.Label>
				<br />
				<DataSelect
					class="_detailbase-input"
					items={placeTypeOptions}
					placeholder="Select place type"
					logic_name="dataselect-placeType-logic-state"
					bind:logic_state={$form.placeType}
				/>
				<Spacer lg />
			{:else if placeTypeDisplay}
				<div class="items-container">
					<Heading is="h4">{placeTypeDisplay}</Heading>
				</div>
				<Spacer lg />
			{/if}
			{#if editing && $form.placeType}
				{#if $KQL_PlacesForSearch.status !== 'DONE'}
					Loading Places...
				{:else}
					<div class="spacer" />
					<Form.Label>
						{getParentName($form.placeType)}
						{$form.name} is a {$form.placeType} Of
					</Form.Label>
					<br />
					<DataSelect
						class="_detailbase-input"
						items={placesForParentSelect}
						placeholder={`Select ${getParentName($form.placeType)}`}
						logic_name="dataselect-parent-logic-state"
						bind:logic_state={$form.parent}
					/>
				{/if}
				<Spacer lg />
			{/if}
			{#if editing}
				{#if $form.placeType}
					{#if $KQL_PlacesForSearch.status !== 'DONE'}
						<div>Loading Places...</div>
						<Spacer lg />
					{:else}
						<div class="spacer" />
						<Form.Label>Child {getChildrenName($form.placeType)}</Form.Label>
						<br />
						<DataSelect
							class="_detailbase-input"
							items={placesForChildrenSelect}
							placeholder={`Select ${getChildrenName($form.placeType)}`}
							logic_name="dataselect-children-logic-state"
							multiple
							bind:logic_state={$form.children}
						/>
						<Spacer lg />
					{/if}
				{/if}
			{:else if children?.length > 0}
				<div class="items-container">
					<Heading is="h4">{getChildrenName(placeTypeDisplay)}</Heading>
					<Spacer xs />
					{#each children as child, i}
						<Anchor sveltekit:prefetch href={`/places/${child.id}`}>{child.name}</Anchor>{i <
						children.length - 1
							? ', '
							: ''}
					{/each}
				</div>
				<Spacer lg />
			{/if}
		</svelte:fragment>
	</Layout>
</StatusHandler>
