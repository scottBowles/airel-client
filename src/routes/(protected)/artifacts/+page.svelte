<script lang="ts">
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import { alphabetically } from '$lib/utils';
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
	import type { PageData } from './$houdini';
	import { fromGlobalId } from 'graphql-relay';

	export let data: PageData;

	$: ({ Artifacts } = data);
	$: artifacts =
		$Artifacts?.data?.artifacts?.edges?.map(({ node }) => node).sort(alphabetically) || [];
</script>

<BannerImage
	overlay="Artifacts"
	imageId={'dnd/City_guard_and_magister-5e_uk2sr0'}
	alt="artifacts banner"
	gravity={compass('north_east')}
/>

<div class="container mx-auto mt-12 mb-32 grid gap-y-4">
	<div><AddLink href="artifacts/create" /></div>

	{#each artifacts as artifact (artifact.id)}
		{@const { id, name, description, thumbnailId, imageIds } = artifact}
		{@const href = `artifacts/${fromGlobalId(id).id}`}
		<ListDetailCard thumbnailId={thumbnailId || imageIds[0]} {name} {description} {href} />
	{/each}
</div>
