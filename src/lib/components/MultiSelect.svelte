<script lang="ts" generics="Opt extends Option">
	import type { ComponentProps } from 'svelte';
	import MultiSelect, { type Option } from 'svelte-multiselect';

	type Props = {
		id: string;
		options?: Opt[];
		selected: Opt[] | undefined;
	} & ComponentProps<MultiSelect<Opt>>;

	let { id, options = [], selected = $bindable(), ...rest }: Props = $props();
</script>

<MultiSelect {id} {options} bind:selected outerDivClass="select select-bordered" {...rest} />
