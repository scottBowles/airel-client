<script lang="ts">
	import { navigating } from '$app/state';
	import type { Snippet } from 'svelte';
	import SearchButton from '../SearchButton.svelte';
	import NavLinks from './NavLinks.svelte';
	import Title from './Title.svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	let innerWidth: number = $state(0);
	let inputToggle: HTMLInputElement;

	function closeDrawer() {
		if (inputToggle) {
			inputToggle.checked = false;
		}
	}

	let drawerShouldClose = $derived(innerWidth >= 1024);
	$effect(() => {
		if (drawerShouldClose) closeDrawer();
	});
	$effect(() => {
		if (navigating) closeDrawer();
	});
</script>

<svelte:window bind:innerWidth />

<!-- <div class="navbar bg-base-300">
	<div class="navbar-content">
		<Title />
		<SearchButton />
	</div>
</div> -->
<div class="drawer lg:drawer-open">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col items-center">
		<!-- <div class="drawer-content flex flex-col items-center justify-center"> -->
		<!-- Page content here -->
		{@render children?.()}
		<label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
	</div>
	<div class="drawer-side">
		<label for="my-drawer-2" class="drawer-overlay"></label>
		<ul class="menu bg-base-300 text-base-content w-80 overflow-y-auto p-4">
			<!-- Sidebar content here -->
			<li class="mt-4 mb-8 text-center text-4xl font-bold">Airel</li>
			<NavLinks btnSize="lg" />
		</ul>
	</div>
</div>
