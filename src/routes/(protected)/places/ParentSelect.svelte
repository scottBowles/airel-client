<script lang="ts">
	import { getParentName } from './utils';

	interface Props {
		name: string;
		parent?: { id: string } | null;
		selectedPlaceTypeDisplay: string;
		placesForParentSelect: SelectOption[];
	}

	let { name, parent = null, selectedPlaceTypeDisplay, placesForParentSelect }: Props = $props();

	let selectedParent = $state(parent?.id || '');

	function clearInvalidParentOnOptionsChange(options: SelectOption[]) {
		return options.some((option) => option.value === selectedParent) ? selectedParent : '';
	}

	$effect(() => {
		selectedParent = clearInvalidParentOnOptionsChange(placesForParentSelect);
	});
</script>

{#if selectedPlaceTypeDisplay && placesForParentSelect.length > 0}
	<div class="form-control w-full max-w-xs">
		<label for="place-parent-select" class="label">
			<span class="label-text">
				{name || 'This'} is a {selectedPlaceTypeDisplay} of the {getParentName(
					selectedPlaceTypeDisplay
				)}
			</span>
		</label>
		<select bind:value={selectedParent} class="select" id="place-parent-select" name="parent.id">
			<option disabled selected>Pick one</option>
			{#each placesForParentSelect as { label, value } (value)}
				<option {value}>{label}</option>
			{/each}
		</select>
	</div>
{/if}
