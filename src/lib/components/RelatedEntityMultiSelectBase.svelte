<script lang="ts">
	import { uniq } from 'ramda';
	import type { Option } from 'svelte-multiselect';
	import MultiSelect from '$lib/components/MultiSelect.svelte';
	import { capitalize } from '$lib/utils';

	export let id: string;
	export let inputGroupName: string;
	export let entityDisplayName: string = inputGroupName;
	export let ids: string[];
	export let optionNamesAndIdNodes: Option[] = [];
	export let fetching: boolean;

	let selected: Option[] = [];

	$: options =
		optionNamesAndIdNodes?.map((edge) => ({
			value: edge.node.id,
			label: edge.node.name
		})) || [];

	function updateIdsOnSelect(selected: Option[]) {
		ids = selected.map((option) => option.value);
	}

	function updateSelectedOnIds(ids: string[], options?: Option[]) {
		if (!options) return;
		selected = uniq(ids)
			.map((id) => {
				const option = options.find((option) => option.node.id === id);
				return option
					? {
							value: option.node.id,
							label: option.node.name
					  }
					: null;
			})
			.filter(Boolean);
	}

	$: updateIdsOnSelect(selected);
	$: updateSelectedOnIds(ids, optionNamesAndIdNodes);
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
	{#each ids as id, i}
		<input type="hidden" name={`${inputGroupName}.set[${i}].id`} value={id} />
	{/each}
</div>
