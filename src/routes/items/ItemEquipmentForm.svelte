<script>
	import Spacer from '$lib/components/Spacer.svelte';

	export let equipment;
	const equipmentDetailInputId = 'item-equipment-brief-description';
</script>

<h3 class="text-xl font-bold">Equipment</h3>
<Spacer xs />
<div class="form-control w-full max-w-xs">
	<label for={equipmentDetailInputId} class="label">
		<span class="label-text">Detail</span>
	</label>
	<textarea
		id={equipmentDetailInputId}
		name="equipment-detail"
		bind:value={equipment.briefDescription}
		class="textarea textarea-bordered"
	/>
</div>
