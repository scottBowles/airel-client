<script lang="ts">
	import MultiSelect, { type Option } from 'svelte-multiselect';

	export let id: string;
	export let options: Option[] = [];
	export let selected: Option[];
</script>

<MultiSelect {id} {options} bind:selected outerDivClass="select select-bordered" {...$$restProps} />

<style>
	:global(div.multiselect) {
		@apply select select-bordered;
		margin: 0;
		height: auto;
	}
</style>
