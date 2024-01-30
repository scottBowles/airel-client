<svelte:options runes={true} />

<script lang="ts">
	let { weapon = undefined } = $props<{ weapon: { attackBonus: number } | null }>();

	const ATTACK_BONUS_ID = '+weapon.attackBonus';
</script>

<div class="form-control w-full max-w-xs">
	<label for={ATTACK_BONUS_ID} class="label">
		<span class="label-text">Attack Bonus</span>
	</label>
	<input
		type="number"
		id={ATTACK_BONUS_ID}
		name={ATTACK_BONUS_ID}
		value={weapon?.attackBonus}
		class="input input-bordered"
	/>
</div>
