<script lang="ts">
	import { capitalize } from '$lib/utils';

	interface Props {
		id: string;
		inputName: string;
		entityDisplayName?: string;
		initialValue: string;
		optionNamesAndIdNodes?: { node: { id: string; name: string } }[];
		fetching: boolean;
	}

	let {
		id,
		inputName,
		entityDisplayName = inputName,
		initialValue,
		optionNamesAndIdNodes = [],
		fetching
	}: Props = $props();

	let selected: string = $state(initialValue);

	let options = $derived(
		optionNamesAndIdNodes?.map((edge) => ({
			value: edge.node.id,
			label: edge.node.name
		})) || []
	);
</script>

<fieldset class="fieldset">
	<label class="label" for={id}>Select Related {capitalize(entityDisplayName)}</label>
	{#if fetching}
		Loading {capitalize(entityDisplayName)}...
	{:else}
		<select bind:value={selected} class="select" {id}>
			<option disabled selected>Pick one</option>
			{#each options as { value, label } (value)}
				<option {value}>{label}</option>
			{/each}
		</select>
	{/if}
	{#if selected}
		<input type="hidden" name={`${inputName}.id`} value={selected} />
	{/if}
</fieldset>
