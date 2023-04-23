<script lang="ts">
	import AddLink from '$lib/components/AddLink.svelte';
	import BannerImage from '$lib/components/BannerImage.svelte';
	import { alphabeticallyBy } from '$lib/utils';
	import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
	import type { PageData } from './$houdini';
	import ArtifactListCard from './ArtifactListCard.svelte';

	export let data: PageData;

	$: ({ Artifacts } = data);
	$: artifacts =
		$Artifacts?.data?.artifacts?.edges?.map(({ node }) => node).sort(alphabeticallyBy('name')) ||
		[];
</script>

<BannerImage
	overlay="Artifacts"
	imageId={'dnd/City_guard_and_magister-5e_uk2sr0'}
	alt="artifacts banner"
	gravity={compass('north_east')}
/>

<div class="container mx-auto mt-12 mb-32 grid gap-y-4">
	<div><AddLink href="artifacts/create" /></div>

	{#each artifacts as artifact (artifact.id)}
		<ArtifactListCard {artifact} />
	{/each}
</div>
