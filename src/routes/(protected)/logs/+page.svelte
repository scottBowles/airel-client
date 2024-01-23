<script lang="ts">
	import { dateAdjustedForUtcOffset, logByGameDate } from '$lib/utils';
	import type { PageData } from './$houdini';
	import AddALog from './AddALog.svelte';
	import { page } from '$app/stores';
	import InfiniteLoading, { type InfiniteEvent } from 'svelte-infinite-loading';
	import Sticky from '$lib/components/Sticky.svelte';
	import LogCondensed from './LogCondensed.svelte';
	import LogExpanded from './LogExpanded.svelte';

	export let data: PageData;

	const Tab = { Condensed: 'Condensed', Expanded: 'Expanded' } as const;
	type Tab = (typeof Tab)[keyof typeof Tab];
	const TabOptions = Object.values(Tab);

	let currentTab: Tab = Tab.Condensed;

	$: ({ me } = $page.data);
	$: ({ GameLogs } = data);
	$: logs = $GameLogs?.data?.gameLogs?.edges?.map(({ node }) => node).sort(logByGameDate) || [];
	const planetSetIn = (log: (typeof logs)[number] | undefined) => {
		const planet = log?.placesSetIn?.edges?.find((edge) => edge.node.placeType === 'PLANET')?.node
			?.name;
		const inSpace = log?.placesSetIn?.edges?.find((edge) => edge.node.name === 'Space')?.node?.name;
		const inTheRedream = log?.placesSetIn?.edges?.find(
			(edge) => edge.node.name === 'In the ReDream'
		)?.node?.name;
		return planet || inSpace || inTheRedream;
	};
	$: logsGroupedWithPlanet = logs
		.reduce((acc, log, i, arr) => {
			const location = planetSetIn(log);
			const lastLocation = planetSetIn(arr[i - 1]);
			if (i === 0 || location !== lastLocation) {
				acc.push({ location, logs: [] });
			}
			acc[acc.length - 1].logs.push(log);
			return acc;
		}, [] as { location: string | undefined; logs: (typeof logs)[number][] }[])
		.map((grouping) => ({
			...grouping,
			startDate: grouping.logs[grouping.logs.length - 1].gameDate,
			endDate: grouping.logs[0].gameDate
		}));

	let onFetchingComplete: (value: void | PromiseLike<void>) => void;
	$: !$GameLogs.fetching && onFetchingComplete?.();
	const awaitLoading = () => new Promise<void>((resolve) => (onFetchingComplete = resolve));

	function infiniteHandler({ detail: { complete, error, loaded } }: InfiniteEvent) {
		awaitLoading().then(() => {
			data.GameLogs.loadNextPage()
				.then($GameLogs.pageInfo.hasNextPage ? loaded : complete)
				.catch(error);
		});
	}

	function fmtDate(date: Date | null) {
		return date
			? dateAdjustedForUtcOffset(new Date(date)).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'short',
					day: 'numeric'
			  })
			: '(date unknown)';
	}
</script>

<div class="container max-w-5xl mx-auto p-4">
	<div class="flex justify-between items-center flex-wrap mb-8">
		<h1 class="text-4xl font-bold">Game Logs</h1>

		{#if me?.isStaff}
			<AddALog />
		{/if}
	</div>

	<div class="tabs">
		{#each TabOptions as tab}
			<a
				class="tab tab-bordered"
				class:tab-active={tab === currentTab}
				on:click={() => (currentTab = tab)}
				on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && (currentTab = tab)}
			>
				{tab}
			</a>
		{/each}
	</div>

	{#if currentTab === Tab.Expanded}
		<ul>
			{#each logsGroupedWithPlanet as logGrouping}
				<Sticky tag="li">
					<div slot="sticky" let:isStuck class="bg-base-100 h-16 flex items-center">
						<h2 class="font-bold text-2xl" class:text-3xl={isStuck}>
							{logGrouping.location}
						</h2>
					</div>
					<div slot="content">
						<ul>
							{#each logGrouping.logs as log (log.id)}
								<LogExpanded {log} />
							{/each}
						</ul>
					</div>
				</Sticky>
			{/each}
		</ul>
	{:else}
		<ul>
			{#each logsGroupedWithPlanet as logGrouping}
				<div class="bg-base-100 h-16 flex items-center">
					<h2 class="font-bold text-2xl">
						{logGrouping.location}
					</h2>
					<p class="text-sm ml-8">
						{#if logGrouping.startDate === logGrouping.endDate}
							{fmtDate(logGrouping.startDate)}
						{:else}
							{fmtDate(logGrouping.startDate)} – {fmtDate(logGrouping.endDate)}
						{/if}
					</p>
				</div>
				<ul>
					{#each logGrouping.logs as log (log.id)}
						<LogCondensed {log} />
					{/each}
				</ul>
			{/each}
		</ul>
	{/if}

	<div>
		<InfiniteLoading on:infinite={infiniteHandler} distance={5000}>
			<div slot="noMore" />
			<div slot="noResults">{$GameLogs.fetching ? 'Loading...' : 'No results'}</div>
			<div slot="error">Something went wrong loading logs</div>
		</InfiniteLoading>
	</div>
</div>
