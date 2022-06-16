<script lang="ts">
	import { KQL_AddEntityLog, KQL_RemoveEntityLog } from '$lib/graphql/_kitql/graphqlStores';
	import { somethingWentWrong } from '$lib/utils';
	import { Card, Heading, Overlay, TextInput } from '@kahi-ui/framework';
	import { tick } from 'svelte';
	import FaCheck from 'svelte-icons/fa/FaCheck.svelte';
	import FaPlus from 'svelte-icons/fa/FaPlus.svelte';
	import FaTimes from 'svelte-icons/fa/FaTimes.svelte';
	import Spacer from '../Spacer.svelte';
	import LogDisplay from './LogDisplay.svelte';

	export let id;
	export let logs;

	type logNode = { id: string; url: string };
	let logNodes: logNode[] = logs?.edges.map(({ node }) => node) ?? [];

	let logInputOpen = false;
	let logInput = '';

	async function openLogInput() {
		logInputOpen = true;
		await tick();
		const logInputField = document.getElementById('log-input');
		logInputField.focus();
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
				// TODO: update store rather than just logs array
				const log = data.addEntityLog.log;
				logNodes.push({ id: log.id, url: log.url });
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
			// TODO: update store rather than just logs array
			logNodes = logNodes.filter((log) => log.id !== logId);
		}
	}
</script>

<div class="logs-container">
	<Heading is="h2">Logs</Heading>
	<Spacer sm />
	<div class="logs-list">
		{#each logNodes as log}
			<LogDisplay {log} {removeLog} />
		{/each}
		<Spacer sm />
		{#if logInputOpen}
			<div class="flex_center_between">
				<TextInput
					span_x={'25'}
					variation="block"
					name="log"
					placeholder="Log url"
					bind:value={logInput}
					id="log-input"
				/>
				<div class="flex">
					<div class="icon" on:click={addLog}><FaCheck /></div>
					<div class="icon" on:click={() => (logInputOpen = false)}><FaTimes /></div>
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
	.flex_center_between {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.icon {
		height: 1em;
		width: 1em;
		margin-left: 0.25em;
		margin-right: 0.25em;
	}
	.flex {
		display: flex;
	}
</style>
