<script lang="ts">
	import { getParentName } from './utils';

	export let name: string;
	export let parent: { id: string } | null = null;
	export let selectedPlaceTypeDisplay: string;
	export let placesForParentSelect: SelectOption[];

	let selectedParent = parent?.id || '';

	function clearInvalidParentOnOptionsChange(options: SelectOption[]) {
		return options.some((option) => option.value === selectedParent) ? selectedParent : '';
	}

	$: selectedParent = clearInvalidParentOnOptionsChange(placesForParentSelect);
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
		<select
			bind:value={selectedParent}
			class="select select-bordered"
			id="place-parent-select"
			name="parent.id"
		>
			<option disabled selected>Pick one</option>
			{#each placesForParentSelect as { label, value }}
				<option {value}>{label}</option>
			{/each}
		</select>
	</div>
{/if}
