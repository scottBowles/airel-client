<script lang="ts">
	import MultiSelect from 'svelte-multiselect';

	export let id;
	export let options;
	export let initialValues;
	export let values;

	let selected = options?.filter((option) => initialValues.includes(option.value)) ?? [];

	$: values = selected.map((association) => association.value);
</script>

<MultiSelect {id} {options} bind:selected outerDivClass="select select-bordered" {...$$restProps} />

<style>
	:global(div.multiselect) {
		@apply select select-bordered;
		margin: 0;
	}
</style>
