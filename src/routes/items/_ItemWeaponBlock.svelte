<script>
	import Spacer from '$lib/components/Spacer.svelte';

	export let weapon;
</script>

<h3 class="text-xl font-bold">Weapon</h3>
<Spacer xs />
<p>Attack Bonus: {weapon?.attackBonus}</p>
