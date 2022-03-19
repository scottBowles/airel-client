<script context="module" lang="ts">
	import {
		getAssociations,
		associations as queriedAssociations
	} from '$lib/graphql/AssociationQueries.gq';
	import BannerImage from '$lib/components/BannerImage.svelte';

	export async function load({ fetch }) {
		await getAssociations({ fetch });
		return {};
	}
</script>

<script>
	import { Anchor, Article, Container, Heading } from '@kahi-ui/framework';

	$: associations = $queriedAssociations?.associations.edges?.map(({ node }) => node);
	$: console.log({ associations });
</script>

<BannerImage overlay="Associations" />

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
