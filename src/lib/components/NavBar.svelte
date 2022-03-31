<script lang="ts">
	import { Anchor, Divider, Menu, Omni, Text } from '@kahi-ui/framework';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { post } from '$lib/utils';

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
			label: 'NPCs',
			href: '/npcs'
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
		console.log('logged out');
	}
</script>

<svelte:head>
	<title>{activeLink.label || 'Airel'}</title>
</svelte:head>

<Omni.Container palette="dark" width="100">
	<Omni.Header>
		<Anchor href="#">Airel</Anchor>
		<Divider orientation="vertical" />
		<Anchor href="#">
			<Text is="small">Between Two Suns</Text>
		</Anchor>
	</Omni.Header>

	<Omni.Footer>
		<Menu.Container orientation="horizontal" sizing="tiny">
			{#each links as link}
				<a href={link.href} sveltekit:prefetch>
					<Menu.Button active={link === activeLink}>{link.label}</Menu.Button>
				</a>
			{/each}
			<a href={'#'} on:click={logout}>
				<Menu.Button>Logout</Menu.Button>
			</a>
		</Menu.Container>
	</Omni.Footer>
</Omni.Container>
