<script context="module" lang="ts">
	import { navigating } from '$app/stores';
	import Algolia from '$lib/components/Algolia.svelte';
	import MobileNavBar from '$lib/components/MobileNav/Bar.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import { PUBLIC_PAGES } from '$lib/constants';
	import { kitQLClient } from '$lib/graphql/kitQLClient';
	import { KQL__Init } from '$lib/graphql/_kitql/graphqlStores';
	import { showAlgoliaSearch } from '$lib/stores';
	import { MediaQueryRender } from '@kahi-ui/framework';
	import '@kahi-ui/framework/dist/kahi-ui.framework.min.css';
	import '@kahi-ui/framework/dist/kahi-ui.theme.default.min.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';

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
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<!-- TODO: put NavBar outside of main and handle min-height accordingly -->
<main>
	<MediaQueryRender queries="(min-width: 975px)">
		<NavBar />
	</MediaQueryRender>
	<MediaQueryRender queries="(max-width: 974px)">
		<MobileNavBar />
	</MediaQueryRender>

	<slot />

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
