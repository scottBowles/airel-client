<script>
	import Spacer from '$lib/components/Spacer.svelte';

	export let armor;
</script>

<h3 class="text-xl font-bold">Armor</h3>
<Spacer xs />
<div class="form-control w-full max-w-xs">
	<label for="ac-bonus" class="label">
		<span class="label-text">AC Bonus</span>
	</label>
	<input
		type="number"
		id="ac-bonus"
		name="acBonus"
		bind:value={armor.acBonus}
		class="input input-bordered"
	/>
</div>
