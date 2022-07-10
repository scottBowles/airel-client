<script lang="ts">
	import { Layout, StatusHandler } from '$lib/components/DetailPage';
	import MultiSelect from '$lib/components/MultiSelect.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { KQL_PlacesForSearch } from '$lib/graphql/_kitql/graphqlStores';
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
	export let patchStore = undefined;

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
			label: node.name + ' (' + node.placeTypeDisplay + ')',
			value: node.id
		};
	}

	$: children = childrenConnection?.edges?.map((edge) => edge.node) || [];
	$: childrenIds = children.map((child) => child.id);

	function getBreadcrumbs(node): any[] {
		return node ? [...getBreadcrumbs(node.parent), node] : [];
	}
	$: breadcrumbs = getBreadcrumbs(place);

	$: placesForParentSelect =
		$KQL_PlacesForSearch.data && $form.placeType
			? [
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

<StatusHandler {creating} {status} {errors} value={place} entityName="place">
	{#if breadcrumbs.length > 0}
		<div class="container mx-auto mt-2">
			<div class="text-sm breadcrumbs">
				<ul>
					{#each breadcrumbs as { id, name }}
						<li>
							<a sveltekit:prefetch href={`/places/${id}`} class="text-accent">
								{name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
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
				<div class="form-control w-full max-w-xs">
					<label class="label" for={`place-${id}-type-select`}>
						<span class="label-text">Select Place Type</span>
					</label>
					<select
						bind:value={$form.placeType}
						class="select select-bordered"
						id={`place-${id}-type-select`}
					>
						<option disabled selected>Pick one</option>
						{#each placeTypeOptions as { id, text }}
							<option value={id}>{text}</option>
						{/each}
					</select>
				</div>
				<Spacer lg />
			{:else if placeTypeDisplay}
				<div class="items-container">
					<h2 class="text-xl font-bold">{placeTypeDisplay}</h2>
				</div>
				<Spacer lg />
			{/if}
			{#if editing}
				<i class="small-text"
					>Note: In general, the hierarchy of places is:<br />
					Stars &gt; Planets &gt; Moons &gt; Regions &gt; Towns &gt; Districts &gt; Locations<br />
				</i>
				<Spacer xs />
			{/if}
			{#if editing && $form.placeType && placesForParentSelect.length > 0}
				<div class="form-control w-full max-w-xs">
					<label for="place-parent-select" class="label">
						<span class="label-text">
							{$form.name || 'This'} is a {$form.placeType} of the {getParentName($form.placeType)}
						</span>
					</label>
					<select bind:value={$form.parent} class="select select-bordered" id="place-parent-select">
						<option disabled selected>Pick one</option>
						{#each placesForParentSelect as { label, value }}
							<option {value}>{label}</option>
						{/each}
					</select>
				</div>
				<Spacer lg />
			{/if}
			{#if editing && $form.placeType && placesForChildrenSelect.length > 0}
				<!-- No need to have a loading display here b/c we're checking whether places for children select exist before we show anything anyways -->
				<div class="form-control w-full max-w-xs">
					<label for="place-children-select" class="label">
						<span class="label-text">
							Child {getChildrenName($form.placeType)}
						</span>
					</label>
					<MultiSelect
						id="place-children-select"
						options={placesForChildrenSelect}
						initialValues={childrenIds}
						bind:values={$form.children}
					/>
				</div>
				<Spacer lg />
			{:else if children?.length > 0}
				<div class="items-container">
					<h2 class="text-xl font-bold">{getChildrenName(placeTypeDisplay)}</h2>
					<Spacer xs />
					{#each children as child, i}
						<a class="link link-accent link-hover" sveltekit:prefetch href={`/places/${child.id}`}>
							{child.name}
						</a>
						{i < children.length - 1 ? ', ' : ''}
					{/each}
				</div>
				<Spacer lg />
			{/if}
		</svelte:fragment>
	</Layout>
</StatusHandler>

<style>
	.small-text {
		font-size: 0.75rem;
		line-height: 1;
	}
</style>
