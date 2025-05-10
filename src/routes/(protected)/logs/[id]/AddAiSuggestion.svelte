<script lang="ts">
	import MdPlaylistAdd from 'svelte-icons/md/MdPlaylistAdd.svelte';
	import { somethingWentWrong } from '$lib/utils';
	import { AddAiLogSuggestionStore, type AddAiLogSuggestion$input } from '$houdini';

	const addAiLogSuggestion = new AddAiLogSuggestionStore();

	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	let isOpen: boolean = $state(false);
	let value: string = $state('');

	const MODAL_ID = 'modal-add-ai-suggestion';

	function handleAddSuggestionJson(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		const aiSuggestionJson = data.get('aiSuggestionJson')?.toString();
		if (!aiSuggestionJson) return;
		try {
			const obj = JSON.parse(aiSuggestionJson) as Omit<AddAiLogSuggestion$input, 'id'>;
			addAiLogSuggestion.mutate({ id, ...obj });
		} catch (err) {
			somethingWentWrong(`Couldn't parse JSON: ${JSON.stringify(err)}}`);
		}
		value = '';
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
		<form onsubmit={handleAddSuggestionJson}>
			<h3 class="text-lg font-bold">Add a Generated Suggestion from JSON</h3>

			<fieldset class="fieldset w-full max-w-xs">
				<label for="ai-suggestion-json" class="label">JSON</label>
				<textarea id="ai-suggestion-json" name="aiSuggestionJson" class="textarea w-full" bind:value
				></textarea>
			</fieldset>

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
