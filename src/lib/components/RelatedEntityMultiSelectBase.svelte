<script lang="ts">
	import MultiSelect from '$lib/components/MultiSelect.svelte';
	import { capitalize } from '$lib/utils';
	import { uniq } from 'ramda';

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

	let selected: typeof options | undefined = $state([]);

	function updateIdsOnSelect(selected: typeof options = []) {
		ids = selected.map((option) => option.value);
	}

	function updateSelectedOnIds(ids: string[], opts: typeof optionNamesAndIdNodes) {
		if (!opts) return;
		selected = uniq(ids)
			.map((id) => {
				const option = opts.find((option) => option.node.id === id);
				return option
					? {
							value: option.node.id,
							label: option.node.name
						}
					: null;
			})
			.filter(Boolean);
	}

	$effect(() => {
		updateIdsOnSelect(selected);
	});
	$effect(() => {
		updateSelectedOnIds(ids, optionNamesAndIdNodes);
	});
</script>

<div class="form-control">
	<label class="label" for={id}>
		<span class="label-text">Select {capitalize(entityDisplayName)}</span>
	</label>
	{#if fetching}
		Loading {capitalize(entityDisplayName)}...
	{:else}
		<MultiSelect {id} {options} bind:selected />
	{/if}
	{#each ids as id, i (id)}
		<input type="hidden" name={`${inputGroupName}.set[${i}].id`} value={id} />
	{/each}
</div>
