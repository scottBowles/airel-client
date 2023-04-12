<script lang="ts">
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import { alphabetically } from '$lib/utils';
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
	import type { PageData } from './$houdini';
	import { fromGlobalId } from 'graphql-relay';

	export let data: PageData;

	$: ({ Items } = data);
	$: items = $Items?.data?.items?.edges?.map(({ node }) => node).sort(alphabetically) || [];
</script>

<BannerImage
	overlay="Items"
	imageId={'dnd/City_guard_and_magister-5e_uk2sr0'}
	alt="items banner"
	gravity={compass('north_east')}
/>

<div class="container mx-auto mt-12 mb-32 grid gap-y-4">
	<div><AddLink href="items/create" /></div>

	{#each items as item (item.id)}
		{@const { id, name, description, thumbnailId, imageIds } = item}
		{@const href = `items/${fromGlobalId(id).id}`}
		<ListDetailCard thumbnailId={thumbnailId || imageIds[0]} {name} {description} {href} />
	{/each}
</div>
