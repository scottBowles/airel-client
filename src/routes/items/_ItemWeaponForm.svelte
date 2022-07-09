<script>
	import Spacer from '$lib/components/Spacer.svelte';

	export let weapon;

	const attackBonusId = 'weapon-attack-bonus';
</script>

<h3 class="text-xl font-bold">Weapon</h3>
<Spacer xs />
<div class="form-control w-full max-w-xs">
	<label for={attackBonusId} class="label">
		<span class="label-text">Attack Bonus</span>
	</label>
	<input
		type="number"
		id={attackBonusId}
		name={attackBonusId}
		bind:value={weapon.attackBonus}
		class="input input-bordered"
	/>
</div>
