<script context="module" lang="ts">
	import {
		getAssociations,
		associations as queriedAssociations
	} from '$lib/graphql/AssociationQueries.gq';

	export async function load({ fetch }) {
		await getAssociations({ fetch });
		return {};
	}
</script>

<script>
	import { Container } from '@kahi-ui/framework';
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
	import BannerImage from '$lib/components/BannerImage.svelte';

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
	<dl>
		{#each associations as association}
			<dt><a href={`associations/${association.id}`}>{association.name}</a></dt>
			<dd>{association.description}</dd>
		{/each}
	</dl>
</Container>

<style>
	.spacer {
		height: 2rem;
	}

	a {
		color: #908149;
	}

	a:hover {
		text-decoration: underline;
	}

	dt {
		font-weight: bold;
	}

	dt:not(:first-child) {
		margin-top: 1rem;
	}
</style>
