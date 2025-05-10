<svelte:options runes={true} />

<script lang="ts">
	import TextAreaAutoGrow from '$lib/components/TextAreaAutoGrow.svelte';

	let { equipment = undefined }: { equipment?: { briefDescription: string } | null } = $props();

	const BRIEF_DESCRIPTION_ID = 'equipment.briefDescription';
</script>

<fieldset class="fieldset w-full max-w-xs">
	<label for={BRIEF_DESCRIPTION_ID} class="label">Detail</label>
	<TextAreaAutoGrow
		id={BRIEF_DESCRIPTION_ID}
		name={BRIEF_DESCRIPTION_ID}
		value={equipment?.briefDescription ?? ''}
		class="textarea"
	/>
</fieldset>
