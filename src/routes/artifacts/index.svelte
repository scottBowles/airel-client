<script context="module" lang="ts">
	import { browser } from '$app/env';
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import fetchBanner from '$lib/fetchBanner';
	import { KQL_Artifacts } from '$lib/graphql/_kitql/graphqlStores';
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
	import { Container } from '@kahi-ui/framework';

	export async function load({ fetch }) {
		if (browser) {
			const [bannerUrl, _] = await Promise.all([
				fetchBanner({
					fetch,
					imageId: 'dnd/City_guard_and_magister-5e_uk2sr0',
					overlay: 'Artifacts',
					gravity: compass('north_east')
				}),
				KQL_Artifacts.queryLoad({ fetch })
			]);
			return { props: { bannerUrl } };
		} else {
			await KQL_Artifacts.queryLoad({ fetch });
			return {};
		}
	}
</script>

<script>
	export let bannerUrl = undefined;

	$: artifacts = $KQL_Artifacts.data?.artifacts.edges?.map(({ node }) => node) || [];
	$: ({ status } = $KQL_Artifacts);
</script>

{#if status === 'LOADING'}
	<span> Loading... </span>
{:else}
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
			<div>
				<AddLink href="artifacts/create" />
			</div>
			{#each artifacts as artifact (artifact.id)}
				{@const { id, name, description, thumbnailId, imageIds, items } = artifact}
				{@const href = `artifacts/${id}`}
				<ListDetailCard {name} {description} thumbnailId={thumbnailId || imageIds[0]} {href}>
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
{/if}

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
</style>
