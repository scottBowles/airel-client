<script lang="ts">
	import { navigating } from '$app/stores';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import SearchButton from '../SearchButton.svelte';
	import NavLinks from './NavLinks.svelte';
	import Title from './Title.svelte';

	let innerWidth: number;
	let inputToggle: HTMLInputElement;

	function closeDrawer() {
		if (inputToggle) {
			inputToggle.checked = false;
		}
	}

	$: drawerShouldClose = innerWidth >= 1024;
	$: if (drawerShouldClose) closeDrawer();
	$: if ($navigating) closeDrawer();

	onMount(() => {
		themeChange(false);
	});
</script>

<svelte:window bind:innerWidth />

<!-- <div class="navbar bg-base-300">
	<div class="navbar-content">
		<Title />
		<SearchButton />
	</div>
</div> -->
<div class="drawer drawer-mobile">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col items-center">
		<!-- <div class="drawer-content flex flex-col items-center justify-center"> -->
		<!-- Page content here -->
		<slot />
		<label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
	</div>
	<div class="drawer-side">
		<label for="my-drawer-2" class="drawer-overlay" />
		<ul class="menu p-4 overflow-y-auto w-80 bg-base-300 text-base-content">
			<!-- Sidebar content here -->
			<li class="text-4xl text-center font-bold mt-4 mb-8">Airel</li>
			<NavLinks btnSize="lg" />
		</ul>
	</div>
</div>
