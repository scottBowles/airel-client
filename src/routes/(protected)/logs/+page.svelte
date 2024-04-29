<svelte:options runes={true} />

<script lang="ts">
	import { dateAdjustedForUtcOffset, fromGlobalId, logByGameDate } from '$lib/utils';
	import type { PageData } from './$houdini';
	import FaCaretDown from 'svelte-icons/fa/FaCaretDown.svelte';
	import FaExternalLinkAlt from 'svelte-icons/fa/FaExternalLinkAlt.svelte';
	import AddALog from './AddALog.svelte';
	import { page } from '$app/stores';
	import InfiniteLoading, { type InfiniteEvent } from 'svelte-infinite-loading';
	import Sticky from '$lib/components/Sticky.svelte';

	let { data }: { data: PageData } = $props();

	let { me } = $derived($page.data);
	let { GameLogs } = $derived(data);
	let logs = $derived(
		$GameLogs?.data?.gameLogs?.edges?.map(({ node }) => node).sort(logByGameDate) || []
	);
	let logsGroupedWithPlanet = $derived(
		logs.reduce(
			(acc, log, i, arr) => {
				const location = planetSetIn(log);
				const lastLocation = planetSetIn(arr[i - 1]);
				if (i === 0 || location !== lastLocation) {
					acc.push({ location, logs: [] });
				}
				acc[acc.length - 1].logs.push(log);
				return acc;
			},
			[] as { location: string | undefined; logs: (typeof logs)[number][] }[]
		)
	);

	function planetSetIn(log: (typeof logs)[number] | undefined) {
		const planet = log?.placesSetIn?.edges?.find((edge) => edge.node.placeType === 'PLANET')?.node
			?.name;
		const inSpace = log?.placesSetIn?.edges?.find((edge) => edge.node.name === 'Space')?.node?.name;
		const inTheRedream = log?.placesSetIn?.edges?.find(
			(edge) => edge.node.name === 'In the ReDream'
		)?.node?.name;
		return planet || inSpace || inTheRedream;
	}

	let onFetchingComplete = $state<(value: void | PromiseLike<void>) => void>((value) => {});

	$effect(() => {
		if (!$GameLogs.fetching) {
			onFetchingComplete?.();
		}
	});

	const awaitLoading = () => new Promise<void>((resolve) => (onFetchingComplete = resolve));

	function infiniteHandler({ detail: { complete, error, loaded } }: InfiniteEvent) {
		awaitLoading().then(() => {
			data.GameLogs.loadNextPage()
				.then($GameLogs.pageInfo.hasNextPage ? loaded : complete)
				.catch(error);
		});
	}
</script>

<div class="container max-w-5xl mx-auto p-4">
	<div class="flex justify-between items-center flex-wrap mb-8">
		<h1 class="text-4xl font-bold">Game Logs</h1>

		{#if me?.isStaff}
			<AddALog />
		{/if}
	</div>

	<ul>
		{#each logsGroupedWithPlanet as logGrouping}
			<Sticky tag="li">
				<div slot="sticky" let:isStuck class="bg-base-100 h-16 flex items-center">
					<h2 class="font-bold text-2xl" class:text-3xl={isStuck}>
						{logGrouping.location}
					</h2>
				</div>
				<div slot="content">
					{#each logGrouping.logs as log (log.id)}
						{@const id = fromGlobalId(log.id).id}
						{@const detailUrl = `/logs/${id}`}
						<ul>
							<!-- <p>{planetSetIn(log)}</p> -->
							<li class="mb-8">
								<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
								<article tabindex="0" class={`collapse group`}>
									<div
										class="card w-full bg-base-200 group-focus:bg-base-300 text-base-content shadow-xl"
									>
										<div class="card-body collapse-title">
											<div class="md:flex justify-between gap-4">
												<h2 class="card-title mb-2">
													<span>
														<a href={detailUrl} class="hover:text-accent">{log.title}</a>
														<a
															href={log.url}
															target="_blank"
															rel="noopener noreferrer"
															class="ml-2"
														>
															<span class="icon inline-block hover:text-accent"
																><FaExternalLinkAlt /></span
															>
														</a>
													</span>
												</h2>
												<h6 class="card-subtitle whitespace-nowrap">
													{log.gameDate
														? dateAdjustedForUtcOffset(new Date(log.gameDate)).toLocaleDateString(
																'en-US',
																{
																	year: 'numeric',
																	month: 'short',
																	day: 'numeric'
																}
															)
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
						</ul>
					{/each}
				</div>
			</Sticky>
		{/each}
	</ul>

	<div>
		<InfiniteLoading on:infinite={infiniteHandler} distance={5000}>
			<div slot="noMore" />
			<div slot="noResults">{$GameLogs.fetching ? 'Loading...' : 'No results'}</div>
			<div slot="error">Something went wrong loading logs</div>
		</InfiniteLoading>
	</div>
</div>

<style>
	.icon {
		display: inline-block;
		height: 16px;
		width: 16px;
	}
	.inputContainer {
		display: flex;
		align-items: baseline;
		margin-bottom: 1rem;
	}
</style>
