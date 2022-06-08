<script lang="ts">
	import { goto } from '$app/navigation';
	import { page, session } from '$app/stores';
	import { post } from '$lib/utils';
	import { Anchor, Heading, Menu } from '@kahi-ui/framework';

	const links = [
		{
			label: 'Home',
			href: '/'
		},
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
		$session.token = null;
		$session.isLoggedIn = false;
		goto('/login');
	}
</script>

<svelte:head>
	<title>{activeLink.label || 'Airel'}</title>
</svelte:head>

<div class="menu-container">
	<Menu.Container>
		<Anchor sveltekit:prefetch href="/"><Heading is="h1">Airel</Heading></Anchor>
		<div class="spacer" />
		{#each links as link}
			<a href={link.href} sveltekit:prefetch>
				<Menu.Button active={link === activeLink}>{link.label}</Menu.Button>
			</a>
		{/each}
		<a href={'#'} on:click={logout}>
			<Menu.Button>Logout</Menu.Button>
		</a>
	</Menu.Container>
</div>

<style>
	.menu-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: hsla(var(--palette-background-lighter), var(--document-background-opacity));
		display: grid;
		place-items: center;
		z-index: 9998;
	}

	.spacer {
		margin-bottom: 1rem;
	}
</style>
