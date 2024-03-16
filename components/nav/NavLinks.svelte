<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { post } from '$lib/utils';

	export let btnSize = '';

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

	$: currentHref = '/' + $page.url.pathname.split('/')[1];
	$: activeLink = links.find((link) => link.href === currentHref) || defaultLink;

	async function logout() {
		await post('/endpoints/logout');
		goto('/login');
	}
</script>

{#each links as link}
	<li>
		<a
			href={link.href}
			class="btn no-animation normal-case btn-{btnSize}"
			class:btn-primary={link === activeLink}
			class:btn-ghost={link !== activeLink}
		>
			{link.label}
		</a>
	</li>
{/each}
<li>
	{#if $page.data.me}
		<button class="btn btn-ghost no-animation normal-case btn-{btnSize}" on:click={logout}>
			Logout
		</button>
	{:else}
		<a
			href={`/login?redirect=${$page.url.pathname}`}
			class="btn btn-ghost no-animation normal-case btn-{btnSize}"
		>
			Login
		</a>
	{/if}
</li>
