<svelte:options runes={true} />

<script lang="ts">
	let { armor = undefined }: { armor?: { acBonus: number } | null } = $props();

	const AC_BONUS_ID = '+armor.acBonus';
</script>

<fieldset class="fieldset w-full max-w-xs">
	<label for={AC_BONUS_ID} class="label">AC Bonus</label>
	<input type="number" id={AC_BONUS_ID} name={AC_BONUS_ID} value={armor?.acBonus} class="input" />
</fieldset>
