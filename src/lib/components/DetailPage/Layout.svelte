<script>
	import { Container, Heading } from '@kahi-ui/framework';

	import LargeImage from '$lib/components/LargeImage.svelte';
	import { BasicProperty } from '$lib/components/DetailPage';

	export let name = 'No name or header slot provided';
	export let properties = {};
	export let imageId;
</script>

<div class="spacer" />
<Container>
	<slot name="header">
		<Heading is="h1">{name}</Heading>
	</slot>
	<div class="spacer-xs" />
	<hr />
	<div class="spacer" />
	<div class="img-container">
		<slot name="mainImage">
			<LargeImage {imageId} alt={name} />
		</slot>
	</div>
	<slot name="properties">
		{#each Object.entries(properties) as [name, value]}
			<BasicProperty {name} {value} />
		{/each}
	</slot>
</Container>

<style>
	hr {
		color: #ccc;
	}
	.spacer {
		height: 2em;
	}
	.spacer-xs {
		height: 0.5em;
	}
	.img-container {
		float: right;
		width: clamp(40%, (120px - 40%) * 1000, 100%);
		margin-left: 0.5em;
		margin-bottom: 0.5em;
	}
</style>
