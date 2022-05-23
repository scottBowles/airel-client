<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import FaBars from 'svelte-icons/fa/FaBars.svelte';
	import Menu from './Menu.svelte';

	let showMobileMenu = false;

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
			<FaBars />
		</div>
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

<style>
	.mobile-top-bar {
		height: 50px;
		width: 100vw;
		overflow: hidden;
		display: flex;
		justify-content: flex-end;
		position: absolute;
		top: 0;
	}
	.hamburger-container {
		display: grid;
		place-items: center;
		height: 50px;
		width: 50px;
	}

	.hamburger-menu {
		z-index: 9999;
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
