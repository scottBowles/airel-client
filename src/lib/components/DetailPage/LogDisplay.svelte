<script lang="ts">
	import { Card, Overlay } from '@kahi-ui/framework';
	import FaTimes from 'svelte-icons/fa/FaTimes.svelte';

	export let log;
	export let removeLog;

	let logic_state = false;

	function handleRemoveLog() {
		removeLog(log.id);
		logic_state = false;
	}
</script>

<div class="flex_center_between">
	<a href={log.url} rel="external noopener noreferrer">{log.name || log.url}</a>
	<div class="icon" on:click={() => (logic_state = true)}><FaTimes /></div>
	<Overlay.Container logic_id={`overlay-logic-state-${log.id}`} bind:logic_state>
		<Overlay.Section>
			<Card.Container max_width="100">
				<Card.Header>Remove log url?</Card.Header>
				<Card.Footer>
					<Overlay.Button on:click={handleRemoveLog}>Yes</Overlay.Button>
					<Overlay.Button>No</Overlay.Button>
				</Card.Footer>
			</Card.Container>
		</Overlay.Section>
	</Overlay.Container>
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
</style>
