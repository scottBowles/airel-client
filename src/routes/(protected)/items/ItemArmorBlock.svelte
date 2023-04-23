<script lang="ts">
	import Spacer from '$lib/components/Spacer.svelte';

	// instead of typing this I probably should just use a fragment here
	export let armor: { acBonus: number };
</script>

<h3 class="text-xl font-bold">Armor</h3>
<Spacer xs />
<p>AC Bonus: {armor?.acBonus}</p>
