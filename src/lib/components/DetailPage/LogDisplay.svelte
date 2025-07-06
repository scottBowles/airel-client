<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		log: any;
		removeLog: (id: string) => void;
	}

	let { log, removeLog }: Props = $props();
	let href = $derived(`/logs/${log.id}`);

	const modalId = `log-modal-${log.id}`;

	function handleRemoveLog() {
		removeLog(log.id);
	}
</script>

<div class="flex items-center justify-between">
	<span>
		<a {href} class="link link-accent link-hover" rel="external noopener noreferrer">
			{log.title || log.url}
		</a>

		<a
			href={log.url}
			target="_blank"
			rel="noopener noreferrer"
			class="ml-2"
			aria-label="External link to log"
		>
			<span class="ext-icon hover:text-accent icon-[fa-solid--external-link-alt]"> </span>
		</a>
	</span>

	{#if page.data.me?.isStaff}
		<!-- The button to open modal -->
		<label for={modalId} class="btn btn-ghost btn-sm modal-button">
			<span class="icon icon-[fa-solid--times]"></span>
		</label>

		<!-- Put this part before </body> tag -->
		<input type="checkbox" id={modalId} class="modal-toggle" />
		<label for={modalId} class="modal modal-bottom sm:modal-middle cursor-pointer">
			<label class="modal-box relative" for="">
				<h3 class="text-lg font-bold">Remove log</h3>
				<p class="py-4">You sure bro?</p>
				<div class="modal-action">
					<label
						for={modalId}
						class="btn btn-neutral"
						onclick={handleRemoveLog}
						onkeypress={handleRemoveLog}>Yes</label
					>
					<label for={modalId} class="btn btn-neutral">No</label>
				</div>
			</label>
		</label>
	{/if}
</div>

<style>
	.ext-icon {
		display: inline-block;
		height: 16px;
		width: 16px;
	}
	.icon {
		height: 1.125em;
		width: 1.125em;
		margin-left: 0.25em;
		margin-right: 0.25em;
	}
</style>
