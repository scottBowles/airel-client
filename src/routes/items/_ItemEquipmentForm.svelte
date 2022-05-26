<script>
	import Spacer from '$lib/components/Spacer.svelte';
	import { Heading, TextInput } from '@kahi-ui/framework';

	export let equipment;
</script>

<Heading is="h5">Equipment</Heading>
<Spacer xs />
<TextInput bind:value={equipment.briefDescription} placeholder="Brief description" is="textarea" />
