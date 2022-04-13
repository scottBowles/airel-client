<script context="module" lang="ts">
	import { getArtifacts, artifacts as queriedArtifacts } from '$lib/graphql/ArtifactQueries.gq';
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
	import { browser } from '$app/env';
	import fetchBanner from '$lib/fetchBanner';

	export async function load({ fetch }) {
		if (browser) {
			const [bannerUrl, _] = await Promise.all([
				fetchBanner({
					fetch,
					imageId: 'dnd/City_guard_and_magister-5e_uk2sr0',
					overlay: 'Artifacts',
					gravity: compass('north_east')
				}),
				getArtifacts({ fetch })
			]);
			return { props: { bannerUrl } };
		} else {
			await getArtifacts({ fetch });
			return {};
		}
	}
</script>

<script>
	import { Container } from '@kahi-ui/framework';

	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';

	export let bannerUrl = undefined;

	$: artifacts = $queriedArtifacts?.artifacts.edges?.map(({ node }) => node);
	$: console.log({ artifacts });
</script>

{#if bannerUrl}
	<img src={bannerUrl} alt="Artifacts" />
{:else}
	<BannerImage
		overlay="Artifacts"
		imageId={'dnd/City_guard_and_magister-5e_uk2sr0'}
		alt="artifacts banner"
		gravity={compass('north_east')}
	/>
{/if}

<div class="spacer" />

<Container>
	<div class="cards-container">
		{#each artifacts as artifact}
			{@const { id, name, description, thumbnailId, items } = artifact}
			{@const href = `artifacts/${id}`}
			<ListDetailCard {name} {description} {thumbnailId} {href}>
				<!-- <svelte:fragment slot="title">
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
				</svelte:fragment> -->
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
