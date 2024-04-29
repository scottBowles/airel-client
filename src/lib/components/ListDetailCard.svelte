<svelte:options runes={true} />

<script lang="ts">
	import { fragment, graphql, type EntityListFields } from '$houdini';
	import Thumbnail from '$lib/components/Thumbnail.svelte';

	let { href, entity }: { href: string; entity: EntityListFields } = $props();

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
	<slot name="thumbnail">
		<Thumbnail thumbnailId={thumbnailId || imageIds?.[0]} />
	</slot>
	<div>
		<p class="title">
			<slot name="title">
				<a {href}>{name}</a>
			</slot>
		</p>
		<p class="description">
			<slot name="description">
				{description ?? ''}
			</slot>
		</p>
	</div>
</div>

<style>
	.title {
		font-size: 1rem;
		font-weight: bold;
	}

	.description {
		color: #999;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
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
