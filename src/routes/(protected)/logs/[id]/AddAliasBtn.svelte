<script lang="ts">
	import FaUsers from 'svelte-icons/fa/FaUsers.svelte';
	import { ENTITY_TYPES, type EntityType } from '$lib/constants';
	import { capitalize } from '$lib/utils';

	export let entityName: string;
	export let suggestedEntityType: EntityType;

	const ALIAS_MODAL_ID = 'modal-alias-entity' + suggestedEntityType + entityName;

	function handleAddAlias(event: Event) {
		const data = new FormData(event.target as HTMLFormElement);
		console.log('handleAddAlias', { event, alias: data.get('alias') });
	}
</script>

<label for={ALIAS_MODAL_ID} class="link hover:accent modal-button">
	<div class="icon"><FaUsers /></div>
</label>

<input type="checkbox" id={ALIAS_MODAL_ID} class="modal-toggle" />
<label for={ALIAS_MODAL_ID} class="modal modal-bottom sm:modal-middle cursor-pointer">
	<label class="modal-box relative" for="">
		<form on:submit|preventDefault={handleAddAlias}>
			<h3 class="font-bold text-lg">Add as Alias</h3>

			<div class="form-control w-full max-w-xs">
				<label class="label" for={'entity'}>
					<span class="label-text">Select Entity</span>
				</label>
				<select class="select select-bordered" id={'entity'} name="placeType">
					{#each ENTITY_TYPES as opt}
						<option value={opt} selected={suggestedEntityType === opt}>{capitalize(opt)}</option>
					{/each}
				</select>
			</div>

			<div class="form-control">
				<label for="alias" class="label"><span class="label-text">Alias</span></label>
				<input name="alias" id="alias" class="input input-bordered" value={entityName} required />
			</div>

			<div class="modal-action">
				<button type="submit" class="btn btn-ghost btn-sm btn-custom ml-auto">Add Alias</button>
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
