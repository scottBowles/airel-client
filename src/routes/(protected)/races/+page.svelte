<script lang="ts">
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import { alphabeticallyBy } from '$lib/utils';
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
	import type { PageData } from './$houdini';
	import { fromGlobalId } from 'graphql-relay';

	export let data: PageData;

	$: ({ Races } = data);
	$: races =
		$Races?.data?.races?.edges?.map(({ node }) => node).sort(alphabeticallyBy('name')) || [];
</script>

<BannerImage
	overlay="Races"
	imageId={'dnd/City_guard_and_magister-5e_uk2sr0'}
	alt="races banner"
	gravity={compass('north_east')}
/>

<div class="container mx-auto mt-12 mb-32 grid gap-y-4">
	<div><AddLink href="races/create" /></div>

	{#each races as race (race.id)}
		{@const { id } = race}
		{@const globalId = fromGlobalId(id).id}
		{@const href = `races/${globalId}`}
		<ListDetailCard entity={race} {href} />
	{/each}
</div>
