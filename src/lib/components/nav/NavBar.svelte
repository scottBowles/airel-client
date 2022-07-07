<script lang="ts">
	import { navigating } from '$app/stores';
	import Algolia from '$lib/components/Algolia.svelte';
	import SearchButton from '../SearchButton.svelte';
	import NavLinks from './NavLinks.svelte';
	import Title from './Title.svelte';

	let innerWidth;
	let inputToggle;

	function closeDrawer() {
		if (inputToggle) {
			inputToggle.checked = false;
		}
	}

	$: drawerShouldClose = innerWidth >= 1024;
	$: if (drawerShouldClose) closeDrawer();
	$: if ($navigating) closeDrawer();
</script>

<svelte:window bind:innerWidth />

<div class="drawer">
	<input id="mobile-drawer" type="checkbox" class="drawer-toggle" bind:this={inputToggle} />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="w-full navbar bg-base-300 justify-between">
			<div class="lg:hidden">
				<label for="mobile-drawer" class="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/></svg
					>
				</label>
			</div>
			<div class="px-2 mx-2"><Title /></div>
			{#if innerWidth > 681}
				<SearchButton />
			{:else}
				<Algolia />
			{/if}
			<div class="hidden lg:block">
				<ul class="flex gap-1">
					<!-- Navbar menu content here -->
					<NavLinks btnSize="sm" />
				</ul>
			</div>
		</div>
		<!-- Page content here -->
		<slot />
	</div>
	<div class="drawer-side">
		<label for="mobile-drawer" class="drawer-overlay" />
		<ul class="menu p-4 overflow-y-auto w-80 bg-base-100 gap-1">
			<!-- Sidebar content here -->
			<div class="text-4xl text-center font-bold mt-4 mb-8">Airel</div>
			<NavLinks btnSize="lg" />
		</ul>
	</div>
</div>
