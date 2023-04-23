<script lang="ts">
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import { alphabeticallyBy } from '$lib/utils';
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
	import type { PageData } from './$houdini';
	import { fromGlobalId } from 'graphql-relay';

	export let data: PageData;

	$: ({ Characters } = data);
	$: characters =
		$Characters?.data?.characters?.edges?.map(({ node }) => node).sort(alphabeticallyBy('name')) ||
		[];
</script>

<BannerImage
	overlay="Characters"
	imageId={'dnd/City_guard_and_magister-5e_uk2sr0'}
	alt="characters banner"
	gravity={compass('north_east')}
/>

<div class="container mx-auto mt-12 mb-32 grid gap-y-4">
	<div><AddLink href="characters/create" /></div>

	{#each characters as character (character.id)}
		{@const { id } = character}
		{@const href = `characters/${fromGlobalId(id).id}`}
		<ListDetailCard entity={character} {href} />
	{/each}
</div>
