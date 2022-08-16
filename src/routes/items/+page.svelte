<script>
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import ItemListDisplay from '$lib/components/ItemListDisplay.svelte';
	import { KQL_Items } from '$lib/graphql/_kitql/graphqlStores';
	import { alphabetically } from '$lib/utils';
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';

	$: items = $KQL_Items.data?.items.edges?.map(({ node }) => node).sort(alphabetically) || [];
</script>

<BannerImage
	overlay="Items"
	imageId={'dnd/City_guard_and_magister-5e_uk2sr0'}
	alt="items banner"
	gravity={compass('north_east')}
/>

<div class="container mx-auto mt-12 mb-32 grid gap-y-4">
	<div><AddLink href="items/create" /></div>

	{#each items as item (item.id)}
		<ItemListDisplay {item} />
	{/each}
</div>
