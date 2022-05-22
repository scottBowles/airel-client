<script context="module" lang="ts">
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import { KQL_Associations } from '$lib/graphql/_kitql/graphqlStores';
	import { thumbnail } from '@cloudinary/url-gen/actions/resize';
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
	import { Container } from '@kahi-ui/framework';
	import { KitQLInfo } from '@kitql/all-in';

	export const load = async ({ fetch }) => {
		console.log('ASSOCIATIONS LOAD FUNCTION RUNNING');
		await KQL_Associations.queryLoad({ fetch });
		return {};
	};
</script>

<script>
	$: associations = $KQL_Associations.data?.associations.edges?.map(({ node }) => node) || [];
	$: ({ status } = $KQL_Associations);
	$: console.log({ associations });
</script>

<BannerImage
	overlay="Associations"
	imageId={'dnd/City_guard_and_magister-5e_uk2sr0'}
	alt="associations banner"
	gravity={compass('north_east')}
/>

<div class="spacer" />

<Container>
	<div class="cards-container">
		<div>
			<AddLink href="associations/create" />
		</div>
		{#each associations as association}
			{@const { id, name, description, thumbnailId, imageIds } = association}
			{@const href = `associations/${id}`}
			<ListDetailCard thumbnailId={thumbnailId || imageIds[0]} {name} {description} {href} />
		{/each}
	</div>
</Container>

<!-- <KitQLInfo store={KQL_Associations} /> -->
<style>
	.spacer {
		height: 2rem;
	}

	.cards-container {
		display: grid;
		row-gap: 1rem;
	}
</style>
