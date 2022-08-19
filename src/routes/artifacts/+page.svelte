<script lang="ts">
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import ItemTypeIcons from '$lib/components/ItemTypeIcons.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import { KQL_Artifacts } from '$lib/graphql/_kitql/graphqlStores';
	import { alphabetically } from '$lib/utils';
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
	import type { PageData } from './$types';

	export let data: PageData;
	const { bannerUrl } = data;

	$: artifacts =
		$KQL_Artifacts.data?.artifacts.edges?.map(({ node }) => node).sort(alphabetically) || [];
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

	<div class="container mx-auto mt-12 mb-32 grid gap-y-4">
		<div><AddLink href="artifacts/create" /></div>

		{#each artifacts as artifact (artifact.id)}
			{@const { id, name, description, thumbnailId, imageIds, items } = artifact}
			{@const href = `artifacts/${id}`}
			{@const itemNodes = items.edges?.map(({ node }) => node) || []}
			{@const isWeapon = itemNodes.some((item) => !!item.weapon)}
			{@const isArmor = itemNodes.some((item) => !!item.armor)}
			{@const isEquipment = itemNodes.some((item) => !!item.equipment)}
			<ListDetailCard {name} {description} thumbnailId={thumbnailId || imageIds[0]} {href}>
				<svelte:fragment slot="title">
					<a {href}>{name}</a>
					<ItemTypeIcons {isWeapon} {isArmor} {isEquipment} />
				</svelte:fragment>
			</ListDetailCard>
		{/each}
	</div>
{/if}
