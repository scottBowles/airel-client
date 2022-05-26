<script>
	import Spacer from '$lib/components/Spacer.svelte';
	import { Form, Heading, NumberInput } from '@kahi-ui/framework';

	export let weapon;
</script>

<Heading is="h5">Weapon</Heading>
<Spacer xs />
<Form.Label>Attack Bonus</Form.Label>
<NumberInput bind:value={weapon.attackBonus} />
