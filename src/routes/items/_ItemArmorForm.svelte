<script>
	import Spacer from '$lib/components/Spacer.svelte';
	import { Form, Heading, NumberInput } from '@kahi-ui/framework';

	export let armor;
</script>

<Heading is="h5">Armor</Heading>
<Spacer xs />
<Form.Label>AC Bonus</Form.Label>
<NumberInput bind:value={armor.acBonus} />
