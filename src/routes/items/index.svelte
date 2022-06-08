<script context="module" lang="ts">
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import { KQL_Items } from '$lib/graphql/_kitql/graphqlStores';
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
	import { Container } from '@kahi-ui/framework';
	import ItemListDisplay from '../../lib/components/ItemListDisplay.svelte';

	export const load = async ({ fetch }) => {
		await KQL_Items.queryLoad({ fetch });
		return {};
	};
</script>

<script>
	$: items = $KQL_Items.data?.items.edges?.map(({ node }) => node) || [];
</script>

<BannerImage
	overlay="Items"
	imageId={'dnd/City_guard_and_magister-5e_uk2sr0'}
	alt="items banner"
	gravity={compass('north_east')}
/>

<div class="spacer" />

<Container>
	<div class="cards-container">
		<div>
			<AddLink href="items/create" />
		</div>
		{#each items as item}
			<ItemListDisplay {item} />
		{/each}
	</div>
</Container>

<style>
	.cards-container {
		display: grid;
		row-gap: 1rem;
	}

	.spacer {
		height: 2rem;
	}
</style>
