<svelte:options runes={true} />

<script lang="ts">
	import { page } from '$app/state';
	import { post } from '$lib/utils';

	let { btnSize = '' } = $props();

	const links = [
		// {
		// 	label: 'Home',
		// 	href: '/'
		// },
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
		},
		{
			label: 'Logs',
			href: '/logs'
		}
	];

	// TODO: should actually handle bad url requests, but this keeps us from crashing for now
	const defaultLink = {
		label: 'Airel',
		href: '/404'
	};

	let currentHref = $derived('/' + page.url.pathname.split('/')[1]);
	let activeLink = $derived(links.find((link) => link.href === currentHref) || defaultLink);

	async function logout() {
		await post('/endpoints/logout');
		window.location.reload();
	}
</script>

{#each links as link (link.label)}
	<li>
		<a
			href={link.href}
			class="btn no-animation btn-{btnSize}"
			class:btn-primary={link === activeLink}
			class:btn-ghost={link !== activeLink}
			class:hover:btn-neutral={link !== activeLink}
		>
			{link.label}
		</a>
	</li>
{/each}
<li>
	{#if page.data.me}
		<button class="btn btn-ghost no-animation btn-{btnSize}" onclick={logout}> Logout </button>
	{:else}
		<a
			href={`/login?redirect=${page.url.pathname}`}
			class="btn btn-ghost no-animation btn-{btnSize}"
		>
			Login
		</a>
	{/if}
</li>
