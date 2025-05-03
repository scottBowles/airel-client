<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { algoliaCloseOnNavigation, algoliaEventListeners } from '$lib/actions';
	import { themes } from '$lib/constants';
	import { type ShowAlgoliaSearch, ThemeState } from '$lib/stores';
	import { capitalize, post } from '$lib/utils';
	import { getContext } from 'svelte';

	const showAlgoliaSearch = getContext<ShowAlgoliaSearch>('showAlgoliaSearch');
	let theme = getContext<ThemeState>('theme');

	const links = [
		{
			label: 'Home',
			href: '/'
		},
		{
			label: 'Items',
			href: '/items'
		},
		{
			label: 'Artifacts',
			href: '/artifacts'
		},
		{
			label: 'Characters',
			href: '/characters'
		},
		{
			label: 'Associations',
			href: '/associations'
		},
		{
			label: 'Places',
			href: '/places'
		},
		{
			label: 'Races',
			href: '/races'
		}
	];

	// TODO: should actually handle bad url requests, but this keeps us from crashing for now
	const defaultLink = {
		label: 'Airel',
		href: '/404'
	};

	$: currentHref = '/' + $page.url.pathname.split('/')[1];
	$: activeLink = links.find((link) => link.href === currentHref) || defaultLink;

	async function logout() {
		await post('/endpoints/logout');
		goto('/login');
	}
</script>

<svelte:body
	use:algoliaEventListeners={showAlgoliaSearch}
	use:algoliaCloseOnNavigation={showAlgoliaSearch}
/>

<div class="flex h-screen w-screen bg-black">
	<div class="h-screen w-40 py-4 pl-4">
		<div class="flex h-full w-full flex-col rounded-l-[84px] bg-yellow-200">
			<div class="h-[84px] w-full"></div>
			<ul class="flex w-full grow flex-col justify-center gap-1 bg-black">
				<div class="flex grow items-center justify-end bg-yellow-200 px-4">
					<h1 class="flex items-center justify-end text-black">AIREL</h1>
				</div>
				{#each links as link}
					<a
						href={link.href}
						class={`grow ${
							activeLink === link ? 'bg-yellow-300' : 'bg-yellow-200'
						} flex items-center justify-end px-4 hover:bg-yellow-300`}
					>
						<li class=" text-black">{link.label.toUpperCase()}</li>
					</a>
				{/each}
				<button class="flex grow items-center justify-end bg-yellow-200 px-4 hover:bg-yellow-300">
					{#if $page.data.me}
						<span
							on:click={logout}
							on:keypress={logout}
							class="flex items-center justify-end text-black"
							role="button"
							tabindex="0"
						>
							LOGOUT
						</span>
					{:else}
						<a
							href={`/login?redirect=${$page.url.pathname}`}
							class="flex items-center justify-end text-black"
						>
							LOGIN
						</a>
					{/if}
				</button>
			</ul>
			<div class="h-[84px] w-full"></div>
		</div>
	</div>
	<div class="flex h-screen w-max flex-1 flex-col py-4 pr-4">
		<div class="flex h-14 w-full overflow-hidden rounded-r-full bg-yellow-200">
			<div class="h-full min-w-[68px] grow-4 bg-yellow-200"></div>
			<div class="h-full w-1 bg-black"></div>
			<div class="h-full min-w-4 grow-12 bg-yellow-200"></div>
			<div class="flex items-center bg-black px-2 text-4xl text-orange-400">
				AIREL &bull; BETWEEN TWO SUNS
			</div>
			<div class="h-full min-w-[48px] grow-2 bg-yellow-200"></div>
		</div>
		<div class="flex-1 overflow-hidden bg-yellow-200">
			<div class="h-full w-full overflow-y-scroll rounded-l-[36px] bg-black p-8">
				<slot />
			</div>
		</div>
		<div class="flex h-14 w-full overflow-hidden rounded-r-full bg-yellow-200">
			<div class="h-full min-w-[54px] grow-2 bg-yellow-200"></div>
			<div
				class="pure-yellow flex items-center border-x-4 border-x-black px-2 text-xl text-black"
				on:click={showAlgoliaSearch.open}
				on:keypress={showAlgoliaSearch.open}
				role="button"
				tabindex="0"
			>
				SEARCH CTRL + K
			</div>
			<div class="pure-yellow flex items-center border-r-4 border-r-black px-2 text-xl text-black">
				<select data-choose-theme class="select select-sm hidden lg:block" bind:value={theme.value}>
					<option value="">Select a theme</option>
					{#each themes as themeOption}
						<option value={themeOption}>{capitalize(themeOption)}</option>
					{/each}
				</select>
			</div>
			<div class="h-full min-w-4 grow-6 bg-yellow-200"></div>
			<div class="flex items-center border-x-4 border-x-black bg-blue-300 px-2 text-3xl text-black">
				ASB &bullet; DESCONNEGUT
			</div>
			<div class="h-full min-w-[48px] grow-2 bg-yellow-200"></div>
		</div>
	</div>
</div>

<style>
	.pure-yellow {
		background-color: #ffff00;
	}
</style>
