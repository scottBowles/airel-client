<script lang="ts">
	import MultiSelect from 'svelte-multiselect';
	import { getChildrenName } from './utils';

	function dedupe(array: SelectOption[]) {
		return array.map((option, i) => {
			const number = array.slice(0, i).filter((o) => o.label === option.label).length;
			return number > 0 ? { ...option, label: `${option.label} (${number + 1})` } : option;
		});
	}
	interface Props {
		childrenIds?: string[];
		selectedPlaceTypeDisplay: string;
		placesForChildrenSelect: SelectOption[];
	}

	let { childrenIds = [], selectedPlaceTypeDisplay, placesForChildrenSelect }: Props = $props();

	let selectedChildren = $state(
		dedupe(placesForChildrenSelect.filter((option) => childrenIds.includes(option.value)))
	);

	let selectedChildrenIds = $derived(selectedChildren.map((child) => child.value));

	function filterChildrenOnOptionsChange(options: SelectOption[]) {
		return selectedChildren.filter((child) =>
			options.some((option) => option.value === child.value)
		);
	}

	$effect(() => {
		selectedChildren = filterChildrenOnOptionsChange(placesForChildrenSelect);
	});
</script>

{#if selectedPlaceTypeDisplay && placesForChildrenSelect.length > 0}
	<!-- No need to have a loading display here b/c we're checking whether places for children select exist before we show anything anyways -->
	<fieldset class="fieldset w-full max-w-xs">
		<label for="place-children-select" class="label"
			>Child {getChildrenName(selectedPlaceTypeDisplay)}</label
		>
		<MultiSelect
			id="place-children-select"
			bind:selected={selectedChildren}
			options={placesForChildrenSelect}
			outerDivClass="select"
		/>
		{#each selectedChildrenIds as id, i (id)}
			<input type="hidden" name={`children.set[${i}].id`} value={id} />
		{/each}
	</fieldset>
{/if}
