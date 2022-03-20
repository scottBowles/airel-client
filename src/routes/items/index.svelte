<script context="module" lang="ts">
	import { getItems, items as queriedItems } from '$lib/graphql/ItemQueries.gq';

	export async function load({ fetch }) {
		await getItems({ fetch });
		return {};
	}
</script>

<script>
	import { Icon } from 'svelte-awesome';
	import { Anchor, Container, Heading } from '@kahi-ui/framework';
	import Thumbnail from '$lib/components/Thumbnail.svelte';
	import { Item } from '@kahi-ui/framework/components/display/list';

	$: items = $queriedItems?.items.edges?.map(({ node }) => node);
	$: console.log({ items });
</script>

<Heading>Replace with an Items Banner</Heading>

<div class="spacer" />

<Container>
	<div class="cards-container">
		{#each items as item}
			<div class="item-card">
				<Thumbnail />
				<div class="item-details">
					<p class="item-title"><a href={`items/${item.id}`}>{item.name}</a></p>
					<p class="item-description">{item.description}</p>
					{#if item.armor}
						<!-- need good icons. not sure the packages I have so far offer what I need. -->
						<p>item.armor is true</p>
					{:else}
						<p>item.armor is false</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</Container>

<style>
	.item-title {
		font-size: 1rem;
		font-weight: bold;
	}
	.item-description {
		color: #999;
	}
	.cards-container {
		display: grid;
		row-gap: 1rem;
	}
	.item-card {
		display: flex;
		column-gap: 1rem;
		/* flex-direction: column;
		align-items: center;
		margin: 1rem; */
	}
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
