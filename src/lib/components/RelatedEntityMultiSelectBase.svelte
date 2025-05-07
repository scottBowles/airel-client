<script lang="ts">
	import { capitalize } from '$lib/utils';
	import { uniq } from 'ramda';
	import MultiSelect, { type Option } from 'svelte-multiselect';

	interface Props {
		id: string;
		inputGroupName: string;
		entityDisplayName?: string;
		ids: string[];
		optionNamesAndIdNodes?:
			| {
					readonly node: {
						readonly id: string;
						readonly name: string;
					};
			  }[]
			| undefined;
		fetching: boolean;
	}

	let {
		id,
		inputGroupName,
		entityDisplayName = inputGroupName,
		ids = $bindable(),
		optionNamesAndIdNodes = [],
		fetching
	}: Props = $props();

	let options = $derived(
		optionNamesAndIdNodes?.map((edge) => ({
			value: edge.node.id,
			label: edge.node.name
		})) || []
	);

	let selected = $derived(
		uniq(ids)
			.map((id) => {
				const option = optionNamesAndIdNodes.find((option) => option.node.id === id);
				return option
					? {
							value: option.node.id,
							label: option.node.name
						}
					: null;
			})
			.filter(Boolean)
	);

	function onChange(
		change: CustomEvent<{
			option?: Option | undefined;
			options?: Option[] | undefined;
			type: 'add' | 'remove' | 'removeAll';
		}>
	) {
		console.log('onChange', change);
		const changeType = change.detail.type;
		if (changeType === 'add') {
			const newOption = change.detail.option;
			if (!newOption) return;
			if (typeof newOption !== 'object' || typeof newOption.value !== 'string')
				throw new Error('Unexpected option type');
			ids = [...ids, newOption.value];
		} else if (changeType === 'remove') {
			const removedOption = change.detail.option;
			if (!removedOption) return;
			if (typeof removedOption !== 'object' || typeof removedOption.value !== 'string')
				throw new Error('Unexpected option type');
			if (removedOption) {
				ids = ids.filter((id) => id !== removedOption.value);
			}
		} else if (changeType === 'removeAll') {
			ids = [];
		}
	}
</script>

<div class="form-control">
	<label class="label" for={id}>
		<span class="label-text">Select {capitalize(entityDisplayName)}</span>
	</label>
	{#if fetching}
		Loading {capitalize(entityDisplayName)}...
	{:else}
		<MultiSelect
			{id}
			{options}
			{selected}
			outerDivClass="select select-bordered"
			on:change={onChange}
		/>
	{/if}
	{#each ids as id, i (id)}
		<input type="hidden" name={`${inputGroupName}.set[${i}].id`} value={id} />
	{/each}
</div>
