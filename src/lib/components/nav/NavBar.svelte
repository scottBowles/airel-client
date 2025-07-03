<svelte:options runes={true} />

<script lang="ts">
	import { navigating } from '$app/state';
	import Algolia from '$lib/components/Algolia.svelte';
	import { themes } from '$lib/constants';
	import { ThemeState } from '$lib/stores';
	import { capitalize } from '$lib/utils';
	import { getContext, type Snippet } from 'svelte';
	import SearchButton from '../SearchButton.svelte';
	import NavLinks from './NavLinks.svelte';
	import Title from './Title.svelte';

	let { children }: { children?: Snippet } = $props();

	let theme = getContext<ThemeState>('theme');

	let inputToggle = $state<HTMLInputElement | null>(null);
	let innerWidth = $state(0);
	let drawerShouldClose = $derived(innerWidth >= 1024);

	function closeDrawer() {
		if (inputToggle) {
			inputToggle.checked = false;
		}
	}

	$effect(() => {
		if (drawerShouldClose) closeDrawer();
		if (navigating.to) closeDrawer();
	});
</script>

<svelte:window bind:innerWidth />

<div class="drawer">
	<input id="mobile-drawer" type="checkbox" class="drawer-toggle" bind:this={inputToggle} />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="navbar bg-base-300 w-full justify-between gap-2">
			<div class="xl:hidden">
				<label for="mobile-drawer" class="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block h-6 w-6 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/></svg
					>
				</label>
			</div>

			<div class="mx-2 px-2"><Title /></div>

			{#if innerWidth > 681}
				<SearchButton />
			{:else}
				<Algolia />
			{/if}

			<!-- <select data-choose-theme bind:value={theme.value} class="select select-sm hidden xl:block">
				<option value="">Select a theme</option>
				{#each themes as themeOption (themeOption)}
					<option value={themeOption}>{capitalize(themeOption)}</option>
				{/each}
			</select> -->

			<div class="hidden xl:block">
				<ul class="flex gap-1">
					<!-- Navbar menu content here -->
					<NavLinks btnSize="md" />
				</ul>
			</div>
		</div>
		<!-- Page content here -->
		{@render children?.()}
	</div>
	<div class="drawer-side">
		<label for="mobile-drawer" class="drawer-overlay"></label>
		<div class="menu bg-base-100 w-80 gap-1 overflow-y-auto p-4">
			<!-- Sidebar content here -->
			<div class="mt-4 mb-8 text-center text-4xl font-bold">Airel</div>
			<ul>
				<NavLinks btnSize="lg" />
			</ul>
		</div>
	</div>
</div>
