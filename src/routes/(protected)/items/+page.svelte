<script lang="ts">
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
	import type { PageData } from './$houdini';
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import { Loading } from '$lib/components/DetailPage';
	import ItemListDisplay from '$lib/components/ItemListDisplay.svelte';
	import { alphabeticallyBy } from '$lib/utils';
	import { page } from '$app/stores';

	export let data: PageData;

	$: ({ me } = $page.data);
	$: ({ Items } = data);
	$: items =
		$Items?.data?.items?.edges?.map((edge) => edge.node).sort(alphabeticallyBy('name')) || [];
</script>

<BannerImage
	overlay="Items"
	imageId={'dnd/City_guard_and_magister-5e_uk2sr0'}
	alt="items banner"
	gravity={compass('north_east')}
/>

<div class="container mx-auto mt-12 mb-32 grid gap-y-4">
	{#if !items}
		<Loading />
	{:else}
		{#if me?.isStaff}
			<div><AddLink href="items/create" /></div>
		{/if}

		{#each items as item (item.id)}
			<ItemListDisplay {item} />
		{/each}
	{/if}
</div>
