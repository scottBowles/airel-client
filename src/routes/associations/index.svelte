<script context="module" lang="ts">
	import {
		getAssociations,
		associations as queriedAssociations
	} from '$lib/graphql/AssociationQueries.gq';
	export const load = async ({ fetch }) => await getAssociations({ fetch });
</script>

<script>
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
	import { Container } from '@kahi-ui/framework';

	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';

	$: associations = $queriedAssociations?.associations.edges?.map(({ node }) => node);
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
		{#each associations as association}
			{@const { id, name, description } = association}
			{@const href = `associations/${id}`}
			<ListDetailCard {name} {description} {href} />
		{/each}
	</div>
</Container>

<style>
	.spacer {
		height: 2rem;
	}

	.cards-container {
		display: grid;
		row-gap: 1rem;
	}
</style>
