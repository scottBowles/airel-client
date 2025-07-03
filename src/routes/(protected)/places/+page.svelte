<svelte:options runes={true} />

<script lang="ts">
	import { page } from '$app/state';
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import { alphabeticallyBy } from '$lib/utils';
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
	import type { PageData } from './$houdini';

	let { data }: { data: PageData } = $props();

	let { me } = $derived(page.data);
	let { Places } = $derived(data);
	let places = $derived(
		$Places?.data?.places?.edges?.map(({ node }) => node).sort(alphabeticallyBy('name')) || []
	);
</script>

<BannerImage
	overlay="Places"
	imageId="dnd/City_guard_and_magister-5e_uk2sr0"
	alt="places banner"
	gravity={compass('north_east')}
/>

<div class="container mx-auto mt-12 mb-32 grid gap-y-4">
	{#if me?.isStaff}
		<div><AddLink href="places/create" /></div>
	{/if}

	{#each places as place (place.id)}
		{@const href = `places/${place.id}`}
		<ListDetailCard entity={place} {href} />
	{/each}
</div>
