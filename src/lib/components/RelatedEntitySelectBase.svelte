<script lang="ts">
	import { capitalize } from '$lib/utils';

	export let id: string;
	export let inputName: string;
	export let entityDisplayName: string = inputName;
	export let initialValue: string;
	export let optionNamesAndIdNodes: { node: { id: string; name: string } }[] = [];
	export let fetching: boolean;

	let selected: string = initialValue;

	$: options =
		optionNamesAndIdNodes?.map((edge) => ({
			value: edge.node.id,
			label: edge.node.name
		})) || [];
</script>

<div class="form-control w-full max-w-xs">
	<label class="label" for={id}>
		<span class="label-text">Select Related {capitalize(entityDisplayName)}</span>
	</label>
	{#if fetching}
		Loading {capitalize(entityDisplayName)}...
	{:else}
		<select bind:value={selected} class="select select-bordered" {id}>
			<option disabled selected>Pick one</option>
			{#each options as { value, label }}
				<option {value}>{label}</option>
			{/each}
		</select>
	{/if}
	<input type="hidden" name={`${inputName}.id`} value={selected} />
</div>
