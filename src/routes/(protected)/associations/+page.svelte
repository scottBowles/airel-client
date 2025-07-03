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
	let { Associations } = $derived(data);
	let associations = $derived(
		$Associations?.data?.associations?.edges
			?.map(({ node }) => node)
			.sort(alphabeticallyBy('name')) || []
	);
</script>

<BannerImage
	overlay="Associations"
	imageId="dnd/City_guard_and_magister-5e_uk2sr0"
	alt="associations banner"
	gravity={compass('north_east')}
/>

<div class="container mx-auto mt-12 mb-32 grid gap-y-4">
	{#if me?.isStaff}
		<div><AddLink href="associations/create" /></div>
	{/if}

	{#each associations as association (association.id)}
		{@const href = `associations/${association.id}`}
		<ListDetailCard entity={association} {href} />
	{/each}
</div>
