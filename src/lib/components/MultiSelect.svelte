<script lang="ts">
	import MultiSelect from 'svelte-multiselect';

	export let id: string;
	export let options: any;
	export let initialValues: any = [];
	export let values;

	let selected = options?.filter((option: any) => initialValues.includes(option.value)) ?? [];

	$: values = selected.map((association: any) => association.value);
</script>

<MultiSelect {id} {options} bind:selected outerDivClass="select select-bordered" {...$$restProps} />

<style>
	:global(div.multiselect) {
		@apply select select-bordered;
		margin: 0;
	}
</style>
