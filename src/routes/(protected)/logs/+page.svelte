<script lang="ts">
	import { fromGlobalId, logByGameDate } from '$lib/utils';
	import type { PageData } from './$houdini';
	import FaCaretDown from 'svelte-icons/fa/FaCaretDown.svelte';
	import FaExternalLinkAlt from 'svelte-icons/fa/FaExternalLinkAlt.svelte';
	import AddALog from './AddALog.svelte';
	import { page } from '$app/stores';

	export let data: PageData;

	$: ({ me } = $page.data);
	$: ({ GameLogs } = data);
	$: logs = $GameLogs?.data?.gameLogs?.edges?.map(({ node }) => node).sort(logByGameDate) || [];
</script>

<div class="container max-w-5xl mx-auto p-4">
	<div class="flex justify-between items-center flex-wrap mb-8">
		<h1 class="text-4xl font-bold">Game Logs</h1>

		{#if me?.isStaff}
			<AddALog />
		{/if}
	</div>
	<ul>
		{#each logs as log (log.id)}
			{@const id = fromGlobalId(log.id).id}
			{@const detailUrl = `/logs/${id}`}
			<li class="mb-8">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<article tabindex="0" class={`collapse group`}>
					<div class="card w-full bg-base-200 group-focus:bg-base-300 text-base-content shadow-xl">
						<div class="card-body collapse-title">
							<div class="md:flex justify-between gap-4">
								<h2 class="card-title mb-2">
									<span>
										<a href={detailUrl} class="hover:text-accent">{log.title}</a>
										<a href={log.url} target="_blank" rel="noopener noreferrer" class="ml-2">
											<span class="icon inline-block hover:text-accent"><FaExternalLinkAlt /></span>
										</a>
									</span>
								</h2>
								<h6 class="card-subtitle whitespace-nowrap">
									{log.gameDate
										? new Date(log.gameDate).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'short',
												day: 'numeric'
										  })
										: '(date unknown)'}
								</h6>
							</div>
							<p>{log.brief || '(brief tbd)'}</p>
						</div>
						<div class="collapse-content">
							{log.synopsis || '(synopsis tbd)'}
						</div>
						<div class="w-full text-center">
							<span class="icon group-focus:hidden"><FaCaretDown /></span>
						</div>
					</div>
				</article>
			</li>
		{/each}
	</ul>
</div>

<style>
	.icon {
		display: inline-block;
		height: 16px;
		width: 16px;
	}
</style>
