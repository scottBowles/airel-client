<script context="module" lang="ts">
	import { navigating } from '$app/stores';
	import MobileNavMenu from '$lib/components/MobileNavMenu.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import { PUBLIC_PAGES } from '$lib/constants';
	import { kitQLClient } from '$lib/graphql/kitQLClient';
	import { Button, MediaQueryRender, Menu } from '@kahi-ui/framework';
	import '@kahi-ui/framework/dist/kahi-ui.framework.min.css';
	import '@kahi-ui/framework/dist/kahi-ui.theme.default.min.css';
	// https://github.com/sindresorhus/github-markdown-css
	// Run `npm run make` to update the CSS. (From github's repo, presumably?)
	import 'github-markdown-css/github-markdown.css';
	import FaBars from 'svelte-icons/fa/FaBars.svelte';

	export async function load({ session, url }) {
		if (!session.isLoggedIn && !PUBLIC_PAGES.includes(url.pathname)) {
			return {
				status: 302,
				redirect: '/login'
			};
		}
		kitQLClient.setHeaders({ Authorization: `JWT ${session.token}` });
		return {};
	}
</script>

<script>
	let showMobileMenu = false;
	function toggleMobileMenu() {
		showMobileMenu = !showMobileMenu;
	}
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<!-- TODO: put NavBar outside of main and handle min-height accordingly -->
<main>
	<MediaQueryRender queries="(min-width: 810px)">
		<NavBar />
	</MediaQueryRender>
	<MediaQueryRender queries="(max-width: 809px)">
		<div class="hamburger-menu" on:click={toggleMobileMenu}>
			<FaBars />
		</div>
		{#if showMobileMenu}
			<MobileNavMenu />
		{/if}
	</MediaQueryRender>

	<slot />
</main>

<style>
	main {
		min-height: 100vh;
		width: 100vw;
		overflow: hidden;
		position: relative;
	}

	.hamburger-menu {
		--hamburger-distance-from-edge: 12px;
		position: absolute;
		top: var(--hamburger-distance-from-edge);
		right: var(--hamburger-distance-from-edge);
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
