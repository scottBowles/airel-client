<svelte:options runes={true} />

<script lang="ts">
	import { fragment, graphql, type EntityListFields } from '$houdini';
	import Thumbnail from '$lib/components/Thumbnail.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		entity: EntityListFields;
		thumbnailSnippet?: Snippet;
		titleSnippet?: Snippet;
		descriptionSnippet?: Snippet;
	}

	let { href, entity, thumbnailSnippet, titleSnippet, descriptionSnippet }: Props = $props();

	let data = $derived(
		fragment(
			entity,
			graphql(`
				fragment EntityListFields on Entity {
					name
					description
					thumbnailId
					imageIds
				}
			`)
		)
	);

	let { name, description, thumbnailId, imageIds } = $derived($data);
</script>

<div class="_card">
	{#if thumbnailSnippet}
		{@render thumbnailSnippet()}
	{:else}
		<Thumbnail thumbnailId={thumbnailId || imageIds?.[0]} />
	{/if}
	<div>
		<p class="title">
			{#if titleSnippet}
				{@render titleSnippet()}
			{:else}
				<a {href}>{name}</a>
			{/if}
		</p>
		<p class="description">
			{#if descriptionSnippet}
				{@render descriptionSnippet()}
			{:else}
				{description ?? ''}
			{/if}
		</p>
	</div>
</div>

<style>
	.title {
		font-size: 1rem;
		font-weight: bold;
		font-family: var(--font-heading);
	}

	.description {
		color: #999;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		font-family: var(--font-content);
	}

	._card {
		display: flex;
		column-gap: 1rem;
	}

	a {
		color: #908149;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
