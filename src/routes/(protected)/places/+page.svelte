<script lang="ts">
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import { alphabeticallyBy } from '$lib/utils';
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
	import type { PageData } from './$houdini';
	import { fromGlobalId } from 'graphql-relay';

	export let data: PageData;

	$: ({ Places } = data);
	$: places =
		$Places?.data?.places?.edges?.map(({ node }) => node).sort(alphabeticallyBy('name')) || [];
</script>

<BannerImage
	overlay="Places"
	imageId={'dnd/City_guard_and_magister-5e_uk2sr0'}
	alt="places banner"
	gravity={compass('north_east')}
/>

<div class="container mx-auto mt-12 mb-32 grid gap-y-4">
	<div><AddLink href="places/create" /></div>

	{#each places as place (place.id)}
		{@const { id } = place}
		{@const globalId = fromGlobalId(id).id}
		{@const href = `places/${globalId}`}
		<ListDetailCard entity={place} {href} />
	{/each}
</div>
