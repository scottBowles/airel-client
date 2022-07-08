<script lang="ts">
	import { callOnEsc } from '$lib/actions';
	import { KQL_AddEntityLog, KQL_RemoveEntityLog } from '$lib/graphql/_kitql/graphqlStores';
	import { somethingWentWrong } from '$lib/utils';
	import { tick } from 'svelte';
	import FaCheck from 'svelte-icons/fa/FaCheck.svelte';
	import FaPlus from 'svelte-icons/fa/FaPlus.svelte';
	import FaTimes from 'svelte-icons/fa/FaTimes.svelte';
	import Spacer from '../Spacer.svelte';
	import LogDisplay from './LogDisplay.svelte';

	export let id;
	export let logs;
	export let patchStore: (patch: Record<string, any>) => void;

	$: logNodes = logs?.edges.map(({ node }) => node) ?? [];

	let logInputOpen = false;
	let logInput = '';

	async function openLogInput() {
		logInputOpen = true;
		await tick();
		const logInputField = document.getElementById('log-input');
		logInputField.focus();
	}

	function closeLogInput() {
		logInputOpen = false;
		logInput = '';
	}

	async function addLog() {
		if (logInput.length > 0) {
			const { data, errors } = await KQL_AddEntityLog.mutate({
				variables: { entityId: id, logUrl: logInput }
			});
			if (errors) somethingWentWrong(errors[0].message);
			if (data?.addEntityLog?.errors) somethingWentWrong(JSON.stringify(data.addEntityLog.errors));
			if (data?.addEntityLog?.ok) {
				logInput = '';
				logInputOpen = false;
				const log = data.addEntityLog.log;
				let newLogEdges;
				if (logNodes.some((node) => node.id === log.id)) {
					newLogEdges = logs.edges.map((edge) =>
						edge.node.id === log.id
							? {
									...edge,
									node: {
										...edge.node,
										...log
									}
							  }
							: edge
					);
				} else {
					newLogEdges = [...(logs?.edges ?? []), { node: log }];
				}
				patchStore({ logs: { edges: newLogEdges } });
			}
		}
	}

	async function removeLog(logId) {
		const { data, errors } = await KQL_RemoveEntityLog.mutate({
			variables: { entityId: id, logId }
		});
		if (errors) somethingWentWrong(errors[0].message);
		if (data?.removeEntityLog?.errors)
			somethingWentWrong(JSON.stringify(data.removeEntityLog.errors));
		if (data?.removeEntityLog?.ok) {
			const newLogEdges = logs.edges.filter((edge) => edge.node.id !== logId);
			patchStore({ logs: { edges: newLogEdges } });
		}
	}
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
			<div class="flex items-center justify-between" use:callOnEsc={closeLogInput}>
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
					<button class="btn btn-square btn-ghost btn-sm" on:click={addLog} type="button"
						><div class="icon"><FaCheck /></div></button
					>
					<button class="btn btn-square btn-ghost btn-sm" on:click={closeLogInput} type="button"
						><div class="icon"><FaTimes /></div></button
					>
				</div>
			</div>
		{:else}
			<div class="icon" on:click={openLogInput}>
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
