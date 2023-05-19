<script lang="ts">
	import MultiSelect from 'svelte-multiselect';

	export let id: string;
	export let options: any;
	export let initialValues: any = [];
	export let values;

	let selected = options?.filter((option: any) => initialValues.includes(option.value)) ?? [];

	$: values = selected.map((s: any) => s.value);
</script>

<MultiSelect {id} {options} bind:selected outerDivClass="select select-bordered" {...$$restProps} />

<style>
	:global(div.multiselect) {
		@apply select select-bordered;
		margin: 0;
		height: auto;
	}
</style>
