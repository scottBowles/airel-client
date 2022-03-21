<script context="module" lang="ts">
	import { getItems, items as queriedItems } from '$lib/graphql/ItemQueries.gq';
	export const load = async ({ fetch }) => await getItems({ fetch });
</script>

<script>
	import { Container, Heading } from '@kahi-ui/framework';
	import GiBroadsword from 'svelte-icons/gi/GiBroadsword.svelte';
	import GiCheckedShield from 'svelte-icons/gi/GiCheckedShield.svelte';
	import GiRoundBottomFlask from 'svelte-icons/gi/GiRoundBottomFlask.svelte';

	import ListDetailCard from '$lib/components/ListDetailCard.svelte';

	$: items = $queriedItems?.items.edges?.map(({ node }) => node);
	$: console.log({ items });
</script>

<Heading>Replace with an Items Banner</Heading>

<div class="spacer" />

<Container>
	<div class="cards-container">
		{#each items as item}
			<ListDetailCard description={item.description}>
				<svelte:fragment slot="title">
					<a href={`items/${item.id}`}>{item.name}</a>
					{#if item.weapon}
						<span class="icon">
							<GiBroadsword />
						</span>
					{/if}
					{#if item.armor}
						<span class="icon">
							<GiCheckedShield />
						</span>
					{/if}
					{#if item.equipment}
						<span class="icon">
							<GiRoundBottomFlask />
						</span>
					{/if}
				</svelte:fragment>
			</ListDetailCard>
		{/each}
	</div>
</Container>

<style>
	.icon {
		display: inline-block;
		height: 1em;
		width: 1em;
		color: #908149;
	}

	.cards-container {
		display: grid;
		row-gap: 1rem;
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
</style>
