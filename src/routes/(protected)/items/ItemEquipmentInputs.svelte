<svelte:options runes={true} />

<script lang="ts">
	let { equipment = undefined }: { equipment: { briefDescription: string } | null } = $props();

	const BRIEF_DESCRIPTION_ID = 'equipment.briefDescription';
</script>

<div class="form-control w-full max-w-xs">
	<label for={BRIEF_DESCRIPTION_ID} class="label">
		<span class="label-text">Detail</span>
	</label>
	<textarea
		id={BRIEF_DESCRIPTION_ID}
		name={BRIEF_DESCRIPTION_ID}
		value={equipment?.briefDescription ?? ''}
		class="textarea textarea-bordered"
	/>
</div>
