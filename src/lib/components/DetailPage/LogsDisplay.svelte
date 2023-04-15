<script lang="ts">
	import { tick } from 'svelte';
	import FaCheck from 'svelte-icons/fa/FaCheck.svelte';
	import FaPlus from 'svelte-icons/fa/FaPlus.svelte';
	import FaTimes from 'svelte-icons/fa/FaTimes.svelte';
	import { AddEntityLogStore, RemoveEntityLogStore } from '$houdini';
	import { callOnEsc } from '$lib/actions';
	import { somethingWentWrong } from '$lib/utils';
	import Spacer from '../Spacer.svelte';
	import LogDisplay from './LogDisplay.svelte';

	const addLogMutation = new AddEntityLogStore();
	const removeLogMutation = new RemoveEntityLogStore();

	export let logs: any;
	export let entityId: string | undefined;

	$: logNodes = logs?.edges.map(({ node }: { node: any }) => node) ?? [];

	let logInputOpen = false;
	let logInput = '';

	async function openLogInput() {
		logInputOpen = true;
		await tick();
		const logInputField = document.getElementById('log-input');
		logInputField?.focus();
	}

	function closeLogInput() {
		logInputOpen = false;
		logInput = '';
	}

	const addLog = async () => {
		if (!entityId) return somethingWentWrong('Could not find object id');
		if (logInput.length === 0) return;

		const res = await addLogMutation.mutate({ entityId, logUrl: logInput });
		if (res.errors) somethingWentWrong(res.errors[0].message);
		closeLogInput();
	};

	const removeLog = async (logId: string) => {
		if (!entityId) return somethingWentWrong('Could not find object id');

		const res = await removeLogMutation.mutate({ entityId, logId });

		if (res.errors) somethingWentWrong(res.errors[0].message);
	};
</script>

<div>
	<h2 class="text-2xl font-bold">Logs</h2>
	<Spacer sm />
	<div>
		{#each logNodes as log (log.id)}
			<LogDisplay {log} {removeLog} />
		{/each}
		<Spacer sm />
		{#if logInputOpen}
			<div class="flex items-center justify-between gap-2" use:callOnEsc={closeLogInput}>
				<input
					type="text"
					id="log-input"
					name="log"
					placeholder="Log url"
					bind:value={logInput}
					class="input input-bordered w-full max-w-xs flex-1"
					autofocus
				/>
				<div>
					<button class="btn btn-square btn-ghost btn-sm" on:click={addLog} type="button">
						<div class="icon"><FaCheck /></div>
					</button>
					<button class="btn btn-square btn-ghost btn-sm" on:click={closeLogInput} type="button">
						<div class="icon"><FaTimes /></div>
					</button>
				</div>
			</div>
		{:else}
			<div class="icon" on:click={openLogInput} on:keypress={openLogInput}>
				<FaPlus />
			</div>
		{/if}
	</div>
</div>

<style>
	.icon {
		height: 1.125em;
		width: 1.125em;
		margin-left: 0.25em;
		margin-right: 0.25em;
	}
</style>
