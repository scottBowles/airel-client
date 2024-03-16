<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast';
	import { GetOrCreateGameLogStore } from '$houdini';
	import { goto } from '$app/navigation';
	import { fromGlobalId } from '$lib/utils';

	const ADD_LOG_MODAL_ID = 'add-log-modal';

	const getOrCreateGameLogMutation = new GetOrCreateGameLogStore();

	let newLogUrl = '';
	let modalOpen = false;

	$: if (!modalOpen) {
		newLogUrl = '';
	}

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const url = data.get('url') as string;
		if (!url) return;

		const res = await getOrCreateGameLogMutation.mutate({ url, lock: true });
		if (res.data?.getOrCreateGameLog.__typename === 'GameLog') {
			toast.push('Log added successfully');
			modalOpen = false;
			const id = fromGlobalId(res.data.getOrCreateGameLog.id).id;
			return goto(`/logs/${id}`);
		}
		toast.push('Something went wrong');
	};
</script>

<label for={ADD_LOG_MODAL_ID} class="modal-button">
	<span class="link link-hover hover:text-accent">Add a Log</span></label
>

<input type="checkbox" bind:checked={modalOpen} id={ADD_LOG_MODAL_ID} class="modal-toggle" />
<label for={ADD_LOG_MODAL_ID} class="modal modal-bottom sm:modal-middle cursor-pointer">
	<label class="modal-box relative">
		<label for={ADD_LOG_MODAL_ID} class="btn btn-sm btn-circle absolute right-2 top-2">x</label>
		<form on:submit={handleSubmit}>
			<h3 class="font-bold text-lg">Add a Log</h3>
			<div class="form-control">
				<label for="url" class="py-4">Enter url of the log's google doc</label>
				<input bind:value={newLogUrl} id="url" name="url" class="input input-bordered" />
			</div>

			<div class="modal-action">
				<label for={ADD_LOG_MODAL_ID}><button class="btn">Add Log</button></label>
			</div>
		</form>
	</label>
</label>
