<script lang="ts">
	import MultiSelect from 'svelte-multiselect';
	import { getChildrenName } from './utils';

	function dedupe(array: SelectOption[]) {
		return array.map((option, i) => {
			const number = array.slice(0, i).filter((o) => o.label === option.label).length;
			return number > 0 ? { ...option, label: `${option.label} (${number + 1})` } : option;
		});
	}

	export let childrenIds: string[] = [];
	export let selectedPlaceTypeDisplay: any;
	export let placesForChildrenSelect: any;

	let selectedChildren = dedupe(
		placesForChildrenSelect.filter((option: any) => childrenIds.includes(option.value))
	);

	$: selectedChildrenIds = selectedChildren.map((child) => child.value);

	function filterChildrenOnOptionsChange(options: any) {
		return selectedChildren.filter((child) =>
			options.some((option: any) => option.value === child.value)
		);
	}

	$: selectedChildren = filterChildrenOnOptionsChange(placesForChildrenSelect);
</script>

{#if selectedPlaceTypeDisplay && placesForChildrenSelect.length > 0}
	<!-- No need to have a loading display here b/c we're checking whether places for children select exist before we show anything anyways -->
	<div class="form-control w-full max-w-xs">
		<label for="place-children-select" class="label">
			<span class="label-text">
				Child {getChildrenName(selectedPlaceTypeDisplay)}
			</span>
		</label>
		<MultiSelect
			id="place-children-select"
			bind:selected={selectedChildren}
			options={placesForChildrenSelect}
		/>
		{#each selectedChildrenIds as id, i}
			<input type="hidden" name={`children.set[${i}].id`} value={id} />
		{/each}
	</div>
{/if}
