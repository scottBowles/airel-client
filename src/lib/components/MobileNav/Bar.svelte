<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import Algolia from '$lib/components/Algolia.svelte';
	import SearchButton from '$lib/components/SearchButton.svelte';
	import FaBars from 'svelte-icons/fa/FaBars.svelte';
	import FaTimes from 'svelte-icons/fa/FaTimes.svelte';
	import Menu from './Menu.svelte';

	let showMobileMenu = false;

	let innerWidth;

	afterNavigate(() => {
		showMobileMenu = false;
	});

	function toggleMobileMenu() {
		showMobileMenu = !showMobileMenu;
	}
</script>

<div class="mobile-top-bar">
	<div class="hamburger-container">
		<div class="hamburger-menu" on:click={toggleMobileMenu}>
			{#if showMobileMenu}
				<FaTimes />
			{:else}
				<FaBars />
			{/if}
		</div>
	</div>
	<div class="search-side-container">
		{#if innerWidth > 681}
			<SearchButton />
		{:else}
			<div class="search-container">
				<Algolia />
			</div>
		{/if}
	</div>
</div>
{#if showMobileMenu}
	<Menu />
{/if}

<svelte:head>
	{#if showMobileMenu}
		<style>
			body {
				overflow: hidden;
				position: fixed;
			}
		</style>
	{:else}
		<style>
			body {
				overflow: auto;
				position: static;
			}
		</style>
	{/if}
</svelte:head>

<svelte:window bind:innerWidth />

<style>
	.mobile-top-bar {
		height: 50px;
		width: 100vw;
		overflow: hidden;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-left: 20px;
		padding-right: 20px;
	}
	.search-side-container {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.search-container {
		width: 50px;
	}

	.hamburger-container {
		display: grid;
		place-items: center;
		height: 50px;
		width: 50px;
	}

	.hamburger-menu {
		z-index: 9998;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		fill: rgb(200, 200, 200);
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
	}
</style>
