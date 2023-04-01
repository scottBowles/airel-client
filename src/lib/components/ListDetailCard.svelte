<script lang="ts">
	import Thumbnail from '$lib/components/Thumbnail.svelte';

	export let thumbnailId: string;
	export let name = '';
	export let description: string | null = '';
	export let href = '';
</script>

<div class="_card">
	<slot name="thumbnail">
		<Thumbnail {thumbnailId} />
	</slot>
	<div>
		<p class="title">
			<slot name="title">
				<a {href}>{name}</a>
			</slot>
		</p>
		<p class="description">
			<slot name="description">
				{description}
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
