<script>
	import Spacer from '$lib/components/Spacer.svelte';
	import { Heading } from '@kahi-ui/framework';

	export let equipment;
</script>

<Heading is="h5">Equipment</Heading>
<Spacer xs />
{equipment?.briefDescription}
