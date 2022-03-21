<script lang="ts">
	import { Heading, Text } from '@kahi-ui/framework';

	export let name = 'No property name provided';
	export let value: string | number = `No value provided for property ${name}`;
</script>

<Heading is="h3">{name}</Heading>
<div class="spacer-sm" />
<slot>
	<Text>{value}</Text>
</slot>
<div class="spacer" />

<style>
	.spacer {
		height: 2em;
	}
	.spacer-sm {
		height: 1em;
	}
</style>
