<script lang="ts">
	import { tick } from 'svelte';
	import FaCheck from 'svelte-icons/fa/FaCheck.svelte';
	import FaPlus from 'svelte-icons/fa/FaPlus.svelte';
	import FaTimes from 'svelte-icons/fa/FaTimes.svelte';
	import { callOnEsc } from '$lib/actions';
	import Spacer from '../Spacer.svelte';
	import LogDisplay from './LogDisplay.svelte';
	import { page } from '$app/stores';

	interface Props {
		logs: any;
		onLogAdd: (logUrl: string) => Promise<void>;
		onLogRemove: (logId: string) => Promise<void> | void;
	}

	let { logs, onLogAdd, onLogRemove }: Props = $props();

	let logNodes = $derived(logs?.edges?.map(({ node }: { node: any }) => node) ?? logs ?? []);

	let logInputOpen = $state(false);
	let logInput = $state('');

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
		if (logInput.length === 0) return;
		await onLogAdd(logInput);
		closeLogInput();
	};
</script>

<div>
	<h2 class="text-2xl font-bold">Logs</h2>
	<Spacer sm />
	<div>
		{#each logNodes as log (log.id)}
			<LogDisplay {log} removeLog={onLogRemove} />
		{/each}
		<Spacer sm />
		{#if $page.data.me?.isStaff}
			{#if logInputOpen}
				<div class="flex items-center justify-between gap-2" use:callOnEsc={closeLogInput}>
					<!-- svelte-ignore a11y_autofocus -->
					<input
						type="text"
						id="log-input"
						name="log"
						placeholder="Log url"
						bind:value={logInput}
						class="input flex-1"
						autofocus
					/>
					<div>
						<button class="btn btn-square btn-ghost btn-sm" onclick={addLog} type="button">
							<div class="icon"><FaCheck /></div>
						</button>
						<button class="btn btn-square btn-ghost btn-sm" onclick={closeLogInput} type="button">
							<div class="icon"><FaTimes /></div>
						</button>
					</div>
				</div>
			{:else}
				<div class="icon" onclick={openLogInput} onkeypress={openLogInput}>
					<FaPlus />
				</div>
			{/if}
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
