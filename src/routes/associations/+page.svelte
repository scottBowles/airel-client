<script>
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import { KQL_Associations } from '$lib/graphql/_kitql/graphqlStores';
	import { alphabetically } from '$lib/utils';
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';

	$: associations =
		$KQL_Associations.data?.associations.edges?.map(({ node }) => node).sort(alphabetically) || [];
</script>

<BannerImage
	overlay="Associations"
	imageId={'dnd/City_guard_and_magister-5e_uk2sr0'}
	alt="associations banner"
	gravity={compass('north_east')}
/>

<div class="container mx-auto mt-12 mb-32 grid gap-y-4">
	<div><AddLink href="associations/create" /></div>

	{#each associations as association (association.id)}
		{@const { id, name, description, thumbnailId, imageIds } = association}
		{@const href = `associations/${id}`}
		<ListDetailCard thumbnailId={thumbnailId || imageIds[0]} {name} {description} {href} />
	{/each}
</div>

<!-- <KitQLInfo store={KQL_Associations} /> -->
