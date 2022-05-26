<script>
	import Spacer from '$lib/components/Spacer.svelte';
	import { Heading } from '@kahi-ui/framework';

	export let weapon;
</script>

<Heading is="h5">Weapon</Heading>
<Spacer xs />
Attack Bonus: {weapon?.attackBonus}
