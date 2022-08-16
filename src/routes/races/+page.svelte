<script context="module" lang="ts">
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import { KQL_Races } from '$lib/graphql/_kitql/graphqlStores';
	import { alphabetically } from '$lib/utils';
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';

	export const load = async ({ fetch }) => {
		await KQL_Races.queryLoad({ fetch });
		return {};
	};
</script>

<script>
	$: races = $KQL_Races.data?.races.edges?.map(({ node }) => node).sort(alphabetically) || [];
</script>

<BannerImage
	overlay="Races"
	imageId={'dnd/City_guard_and_magister-5e_uk2sr0'}
	alt="associations banner"
	gravity={compass('north_east')}
/>

<div class="container mx-auto mt-12 mb-32 grid gap-y-4">
	<div><AddLink href="races/create" /></div>

	{#each races as race (race.id)}
		{@const { id, name, description, thumbnailId, imageIds } = race}
		{@const href = `races/${id}`}
		<ListDetailCard {name} {description} {href} thumbnailId={thumbnailId || imageIds[0]} />
	{/each}
</div>
