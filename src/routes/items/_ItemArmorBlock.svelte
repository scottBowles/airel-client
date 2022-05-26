<script>
	import Spacer from '$lib/components/Spacer.svelte';
	import { Heading } from '@kahi-ui/framework';

	export let armor;
</script>

<Heading is="h5">Armor</Heading>
<Spacer xs />
AC Bonus: {armor?.acBonus}
