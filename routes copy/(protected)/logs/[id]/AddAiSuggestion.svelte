<script lang="ts">
	import MdPlaylistAdd from 'svelte-icons/md/MdPlaylistAdd.svelte';
	import { somethingWentWrong } from '$lib/utils';
	import { AddAiLogSuggestionStore, type AddAiLogSuggestion$input } from '$houdini';

	const addAiLogSuggestion = new AddAiLogSuggestionStore();

	export let id: string;

	let isOpen: boolean;

	const MODAL_ID = 'modal-add-ai-suggestion';

	function handleAddSuggestionJson(event: Event) {
		const data = new FormData(event.target as HTMLFormElement);
		const aiSuggestionJson = data.get('aiSuggestionJson')?.toString();
		if (!aiSuggestionJson) return;
		try {
			const obj = JSON.parse(aiSuggestionJson) as Omit<AddAiLogSuggestion$input, 'id'>;
			addAiLogSuggestion.mutate({ id, ...obj });
		} catch (err) {
			somethingWentWrong(`Couldn't parse JSON: ${JSON.stringify(err)}}`);
		}
		isOpen = false;
	}
</script>

<div class="tooltip mx-auto" data-tip="Add Ai Suggestion from Json">
	<label for={MODAL_ID} class="btn btn-ghost btn-sm icon-btn hover:accent modal-button">
		<div class="icon"><MdPlaylistAdd /></div>
	</label>
</div>

<input type="checkbox" id={MODAL_ID} class="modal-toggle" bind:checked={isOpen} />
<label for={MODAL_ID} class="modal modal-bottom sm:modal-middle cursor-pointer">
	<label class="modal-box relative" for="">
		<form on:submit|preventDefault={handleAddSuggestionJson}>
			<h3 class="font-bold text-lg">Add a Generated Suggestion from JSON</h3>

			<div class="form-control w-full max-w-xs">
				<label for="ai-suggestion-json" class="label">
					<span class="label-text">JSON</span>
				</label>
				<textarea
					id="ai-suggestion-json"
					name="aiSuggestionJson"
					class="textarea textarea-bordered w-full"
				/>
			</div>

			<div class="modal-action">
				<button type="submit" class="btn btn-ghost btn-sm btn-custom ml-auto">
					Add Suggestion
				</button>
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
</style>
