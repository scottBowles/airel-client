<script lang="ts">
	import type { PlaceType$options } from '$houdini';
	import { PLACE_TYPE_OPTIONS } from './utils';

	interface Props {
		id?: string;
		selectedPlaceType: PlaceType$options | null;
	}

	let { id = 'create', selectedPlaceType = $bindable() }: Props = $props();
</script>

<div class="form-control w-full max-w-xs">
	<label class="label" for={`place-${id}-type-select`}>
		<span class="label-text">Select Place Type</span>
	</label>
	<select
		bind:value={selectedPlaceType}
		class="select"
		id={`place-${id}-type-select`}
		name="placeType"
	>
		<option disabled selected>Pick one</option>
		{#each PLACE_TYPE_OPTIONS as { id, text } (id)}
			<option value={id}>{text}</option>
		{/each}
	</select>
</div>
