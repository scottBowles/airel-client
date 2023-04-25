<script lang="ts">
	import MultiSelect from '$lib/components/MultiSelect.svelte';
	import { capitalize } from '$lib/utils';

	export let id: string;
	export let inputGroupName: string;
	export let entityDisplayName: string = inputGroupName;
	export let initialValues: string[] = [];
	export let optionNamesAndIdNodes: { node: { id: string; name: string } }[] = [];
	export let fetching: boolean;

	let selected: string[] = [];

	$: options =
		optionNamesAndIdNodes?.map((edge) => ({
			value: edge.node.id,
			label: edge.node.name
		})) || [];
</script>

<div class="form-control w-full max-w-xs">
	<label class="label" for={id}>
		<span class="label-text">Select {capitalize(entityDisplayName)}</span>
	</label>
	{#if fetching}
		Loading {capitalize(entityDisplayName)}...
	{:else}
		<MultiSelect {id} {options} {initialValues} bind:values={selected} />
	{/if}
	{#each selected as id, i}
		<input type="hidden" name={`${inputGroupName}.set[${i}].id`} value={id} />
	{/each}
</div>
