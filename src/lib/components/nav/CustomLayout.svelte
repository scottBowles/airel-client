<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { algoliaCloseOnNavigation, algoliaEventListeners } from '$lib/actions';
	import { themes } from '$lib/constants';
	import type { Theme } from '$lib/stores';
	import type { ShowAlgoliaSearch } from '$lib/stores';
	import { capitalize, post } from '$lib/utils';
	import { getContext, onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	const showAlgoliaSearch = getContext<ShowAlgoliaSearch>('showAlgoliaSearch');
	const theme = getContext<Theme>('theme');

	onMount(() => {
		themeChange(false);
	});

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

<div class="w-screen h-screen flex bg-black">
	<div class="h-screen w-40 pl-4 py-4">
		<div class="h-full w-full bg-yellow-200 rounded-l-[84px] flex flex-col">
			<div class="h-[84px] w-full" />
			<ul class="w-full grow bg-black flex flex-col justify-center gap-1">
				<div class="grow bg-yellow-200 flex items-center justify-end px-4">
					<h1 class="text-black flex items-center justify-end">AIREL</h1>
				</div>
				{#each links as link}
					<a
						href={link.href}
						class={`grow ${
							activeLink === link ? 'bg-yellow-300' : 'bg-yellow-200'
						} hover:bg-yellow-300 flex items-center justify-end px-4`}
					>
						<li class=" text-black">{link.label.toUpperCase()}</li>
					</a>
				{/each}
				<button class="grow bg-yellow-200 hover:bg-yellow-300 flex items-center justify-end px-4">
					<span
						on:click={logout}
						on:keypress={logout}
						class="text-black flex items-center justify-end"
					>
						LOGOUT
					</span>
				</button>
			</ul>
			<div class="h-[84px] w-full" />
		</div>
	</div>
	<div class="h-screen w-max flex-1 pr-4 py-4 flex flex-col">
		<div class="bg-yellow-200 w-full rounded-r-full h-14 flex overflow-hidden">
			<div class="bg-yellow-200 grow-[4] min-w-[68px] h-full" />
			<div class="bg-black w-1 h-full" />
			<div class="bg-yellow-200 grow-[12] min-w-4 h-full" />
			<div class="bg-black text-4xl px-2 flex items-center text-orange-400">
				AIREL &bull; BETWEEN TWO SUNS
			</div>
			<div class="bg-yellow-200 grow-[2] min-w-[48px] h-full" />
		</div>
		<div class="flex-1 bg-yellow-200 overflow-hidden">
			<div class="bg-black h-full w-full rounded-l-[36px] overflow-y-scroll p-8">
				<slot />
			</div>
		</div>
		<div class="bg-yellow-200 w-full rounded-r-full h-14 flex overflow-hidden">
			<div class="bg-yellow-200 grow-[2] min-w-[54px] h-full" />
			<div
				class="pure-yellow border-x-4 border-x-black text-xl px-2 flex items-center text-black"
				on:click={showAlgoliaSearch.open}
				on:keypress={showAlgoliaSearch.open}
			>
				SEARCH CTRL + K
			</div>
			<div class="pure-yellow border-r-4 border-r-black text-xl px-2 flex items-center text-black">
				<select
					data-choose-theme
					class="select select-sm select-ghost select-bordered hidden lg:block"
					bind:value={$theme}
				>
					<option value="">Select a theme</option>
					{#each themes as theme}
						<option value={theme}>{capitalize(theme)}</option>
					{/each}
				</select>
			</div>
			<div class="bg-yellow-200 grow-[6] min-w-4 h-full" />
			<div class="bg-blue-300 text-3xl px-2 flex items-center text-black border-x-4 border-x-black">
				ASB &bullet; DESCONNEGUT
			</div>
			<div class="bg-yellow-200 grow-[2] min-w-[48px] h-full" />
		</div>
	</div>
</div>

<style>
	.pure-yellow {
		background-color: #ffff00;
	}
</style>
