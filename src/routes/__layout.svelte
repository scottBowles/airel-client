<script context="module" lang="ts">
	import { navigating } from '$app/stores';
	import Algolia from '$lib/components/Algolia.svelte';
	import AllDrawers from '$lib/components/nav/AllDrawers.svelte';
	import CustomLayout from '$lib/components/nav/CustomLayout.svelte';
	import NavBar from '$lib/components/nav/NavBar.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import { PUBLIC_PAGES } from '$lib/constants';
	import { kitQLClient } from '$lib/graphql/kitQLClient';
	import { KQL__Init } from '$lib/graphql/_kitql/graphqlStores';
	import { showAlgoliaSearch, theme } from '$lib/stores';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import '../app.css';

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
	KQL__Init();

	$: console.log({ $theme });
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<!-- TODO: put NavBar outside of main and handle min-height accordingly -->
<main>
	<!-- <AllDrawers><slot /></AllDrawers> -->
	{#if $theme === 'trek'}
		<CustomLayout><slot /></CustomLayout>
	{:else}
		<NavBar><slot /></NavBar>
	{/if}

	<SvelteToast options={{ pausable: true }} />

	{#if $showAlgoliaSearch}
		<div class="search-modal">
			<Algolia placeholder="Search" />
		</div>
	{/if}
</main>

<style>
	main {
		min-height: 100vh;
		width: 100vw;
		overflow: hidden;
		position: relative;
	}
	.search-modal {
		--algolia-search-width: clamp(50%, 500px, 90%);
		width: var(--algolia-search-width);
		height: 500px;
		position: absolute;
		top: 10%;
		left: calc(50% - var(--algolia-search-width) / 2);
	}
</style>
