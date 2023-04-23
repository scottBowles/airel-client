<script lang="ts">
	import Spacer from '$lib/components/Spacer.svelte';

	// instead of typing this I probably should just use a fragment here
	export let weapon: { attackBonus: number };
</script>

<h3 class="text-xl font-bold">Weapon</h3>
<Spacer xs />
<p>Attack Bonus: {weapon?.attackBonus}</p>
