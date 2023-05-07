<script lang="ts">
	import type { PlaceType$options } from '$houdini';
	import { PLACE_TYPE_OPTIONS } from './utils';

	export let id: string = 'create';
	export let selectedPlaceType: PlaceType$options | null;
</script>

<div class="form-control w-full max-w-xs">
	<label class="label" for={`place-${id}-type-select`}>
		<span class="label-text">Select Place Type</span>
	</label>
	<select
		bind:value={selectedPlaceType}
		class="select select-bordered"
		id={`place-${id}-type-select`}
		name="placeType"
	>
		<option disabled selected>Pick one</option>
		{#each PLACE_TYPE_OPTIONS as { id, text }}
			<option value={id}>{text}</option>
		{/each}
	</select>
</div>
