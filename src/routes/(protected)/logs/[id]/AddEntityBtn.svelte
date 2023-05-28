<script lang="ts">
	import FaUserPlus from 'svelte-icons/fa/FaUserPlus.svelte';
	import { ENTITY_TYPES, type EntityType } from '$lib/constants';
	import { capitalize } from '$lib/utils';

	export let entityName: string;
	export let suggestedEntityType: EntityType;

	const ADD_MODAL_ID = 'modal-add-entity' + suggestedEntityType + entityName;

	function handleAddEntity(event: Event) {
		const data = new FormData(event.target as HTMLFormElement);
		console.log('handleAddEntity', { event, name: data.get('name'), alias: data.get('alias') });
	}
</script>

<label for={ADD_MODAL_ID} class="link hover:accent modal-button">
	<div class="icon"><FaUserPlus /></div>
</label>

<input type="checkbox" id={ADD_MODAL_ID} class="modal-toggle" />
<label for={ADD_MODAL_ID} class="modal modal-bottom sm:modal-middle cursor-pointer">
	<label class="modal-box relative" for="">
		<form on:submit|preventDefault={handleAddEntity}>
			<h3 class="font-bold text-lg">Add Entity</h3>

			<div class="form-control w-full max-w-xs">
				<label class="label" for={'entity-type'}>
					<span class="label-text">Select Entity Type</span>
				</label>
				<select class="select select-bordered" id={'entity-type'} name="placeType">
					{#each ENTITY_TYPES as opt}
						<option value={opt} selected={suggestedEntityType === opt}>{capitalize(opt)}</option>
					{/each}
				</select>
			</div>

			<div class="form-control">
				<label for="name" class="label"><span class="label-text">Name</span></label>
				<input name="name" id="name" class="input input-bordered" value={entityName} required />
			</div>

			<div class="form-control">
				<label for="alias" class="label"><span class="label-text">Alias</span></label>
				<input name="alias" id="alias" class="input input-bordered" />
			</div>

			<div class="modal-action">
				<button type="submit" class="btn btn-ghost btn-sm btn-custom ml-auto">Add Entity</button>
			</div>
		</form>
	</label>
</label>

<style>
	.icon {
		display: inline-block;
		height: 16px;
		width: 16px;
	}

	.icon-btn:hover {
		color: #908149;
	}

	.tooltip {
		text-transform: none;
	}
</style>
