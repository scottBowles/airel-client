<script lang="ts">
	import { goto } from '$app/navigation';
	import { GetOrCreateGameLogStore } from '$houdini';
	import { toast } from '@zerodevx/svelte-toast';

	const ADD_LOG_MODAL_ID = 'add-log-modal';

	const getOrCreateGameLogMutation = new GetOrCreateGameLogStore();

	let newLogUrl = $state('');
	let modalOpen = $state(false);

	$effect(() => {
		if (!modalOpen) {
			newLogUrl = '';
		}
	});

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		const data = new FormData(event.target as HTMLFormElement);
		const url = data.get('url') as string;
		if (!url) return;

		const res = await getOrCreateGameLogMutation.mutate({ url, lock: true });
		if (res.data?.getOrCreateGameLog.__typename === 'GameLog') {
			toast.push('Log added successfully');
			modalOpen = false;
			const { id } = res.data.getOrCreateGameLog;
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
		<label for={ADD_LOG_MODAL_ID} class="btn btn-neutral btn-sm btn-circle absolute top-2 right-2"
			>x</label
		>
		<form onsubmit={handleSubmit}>
			<h3 class="mb-3 text-lg font-bold">Add a Log</h3>
			<fieldset class="fieldset">
				<label for="url" class="label">Enter url of the log's google doc</label>
				<input bind:value={newLogUrl} id="url" name="url" class="input" />
			</fieldset>

			<div class="modal-action">
				<label for={ADD_LOG_MODAL_ID}><button class="btn btn-neutral">Add Log</button></label>
			</div>
		</form>
	</label>
</label>
