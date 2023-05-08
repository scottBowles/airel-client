<script lang="ts">
	import FaTimes from 'svelte-icons/fa/FaTimes.svelte';

	export let log: any;
	export let removeLog: (id: string) => void;

	const modalId = `log-modal-${log.id}`;

	function handleRemoveLog() {
		removeLog(log.id);
	}
</script>

<div class="flex items-center justify-between">
	<a href={log.url} class="link link-accent link-hover" rel="external noopener noreferrer">
		{log.name || log.url}
	</a>

	<!-- The button to open modal -->
	<label for={modalId} class="btn btn-ghost btn-sm modal-button">
		<div class="icon"><FaTimes /></div>
	</label>

	<!-- Put this part before </body> tag -->
	<input type="checkbox" id={modalId} class="modal-toggle" />
	<label for={modalId} class="modal modal-bottom sm:modal-middle cursor-pointer">
		<label class="modal-box relative" for="">
			<h3 class="font-bold text-lg">Remove log</h3>
			<p class="py-4">You sure bro?</p>
			<div class="modal-action">
				<label for={modalId} class="btn" on:click={handleRemoveLog} on:keypress={handleRemoveLog}
					>Yes</label
				>
				<label for={modalId} class="btn">No</label>
			</div>
		</label>
	</label>
</div>

<style>
	.icon {
		height: 1.125em;
		width: 1.125em;
		margin-left: 0.25em;
		margin-right: 0.25em;
	}
</style>
