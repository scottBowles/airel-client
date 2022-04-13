<script context="module" lang="ts">
	import { getItems, items as queriedItems } from '$lib/graphql/ItemQueries.gq';
	export const load = async ({ fetch }) => await getItems({ fetch });
</script>

<script>
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';

	import BannerImage from '$lib/components/BannerImage.svelte';
	import { Container } from '@kahi-ui/framework';
	import GiBroadsword from 'svelte-icons/gi/GiBroadsword.svelte';
	import GiCheckedShield from 'svelte-icons/gi/GiCheckedShield.svelte';
	import GiRoundBottomFlask from 'svelte-icons/gi/GiRoundBottomFlask.svelte';

	import ListDetailCard from '$lib/components/ListDetailCard.svelte';

	$: items = $queriedItems?.items.edges?.map(({ node }) => node);
	$: console.log({ items });
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
		{#each items as item}
			{@const { id, name, description, thumbnailId, weapon, armor, equipment } = item}
			{@const href = `items/${id}`}
			<ListDetailCard {description} {thumbnailId}>
				<svelte:fragment slot="title">
					<a {href}>{name}</a>
					{#if weapon}
						<span class="icon">
							<GiBroadsword />
						</span>
					{/if}
					{#if armor}
						<span class="icon">
							<GiCheckedShield />
						</span>
					{/if}
					{#if equipment}
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
