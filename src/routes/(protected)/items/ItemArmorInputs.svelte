<script lang="ts">
	export let armor: { acBonus: number } | null | undefined = undefined;

	const AC_BONUS_ID = '+armor.acBonus';
</script>

<div class="form-control w-full max-w-xs">
	<label for={AC_BONUS_ID} class="label">
		<span class="label-text">AC Bonus</span>
	</label>
	<input
		type="number"
		id={AC_BONUS_ID}
		name={AC_BONUS_ID}
		value={armor?.acBonus}
		class="input input-bordered"
	/>
</div>
