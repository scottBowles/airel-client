<script>
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import { KQL_Places } from '$lib/graphql/_kitql/graphqlStores';
	import { alphabetically, placeByPrecendence } from '$lib/utils';

	$: places =
		$KQL_Places.data?.places.edges
			?.map(({ node }) => node)
			.sort(alphabetically)
			.sort(placeByPrecendence) || [];
</script>

<BannerImage overlay="Places" imageId="dnd/places-banner_bwv6ut" alt="places banner" />

<!-- Show suns and planets in order -->

<!-- Show places in order of most to least recently updated -->

<div class="container mx-auto mt-12 mb-32 grid gap-y-4">
	<div><AddLink href="places/create" /></div>

	{#each places as place (place.id)}
		{@const { id, name, description, thumbnailId, imageIds, placeTypeDisplay } = place}
		{@const href = `places/${id}`}
		<ListDetailCard
			name={`${name} (${placeTypeDisplay})`}
			{description}
			thumbnailId={thumbnailId || imageIds[0]}
			{href}
		/>
	{/each}
</div>
