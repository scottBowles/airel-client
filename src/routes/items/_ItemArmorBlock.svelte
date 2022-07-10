<script>
	import Spacer from '$lib/components/Spacer.svelte';

	export let armor;
</script>

<h3 class="text-xl font-bold">Armor</h3>
<Spacer xs />
<p>AC Bonus: {armor?.acBonus}</p>
