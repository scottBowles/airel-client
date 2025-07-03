<svelte:options runes={true} />

<script lang="ts">
	let { weapon = undefined }: { weapon?: { attackBonus: number } | null } = $props();

	const ATTACK_BONUS_ID = '+weapon.attackBonus';
</script>

<fieldset class="fieldset w-full max-w-xs">
	<label for={ATTACK_BONUS_ID} class="label">Attack Bonus</label>
	<input
		type="number"
		id={ATTACK_BONUS_ID}
		name={ATTACK_BONUS_ID}
		value={weapon?.attackBonus}
		class="input"
	/>
</fieldset>
