<script lang="ts">
	import { goto } from '$app/navigation';
	import { page, session } from '$app/stores';
	import { post } from '$lib/utils';
	import {
		Anchor,
		Aside,
		Divider,
		MediaQueryRender,
		Menu,
		Omni,
		Spacer,
		Text
	} from '@kahi-ui/framework';

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

<Omni.Container palette="dark" width="100">
	<Omni.Header>
		<Anchor sveltekit:prefetch href="#">Airel</Anchor>
		<MediaQueryRender queries="(min-width: 1132px)">
			<Divider orientation="vertical" />
			<Anchor href="#">
				<Text is="small">Between Two Suns</Text>
			</Anchor>
		</MediaQueryRender>
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

<!-- <Aside.Container palette="auto" max_width="content-max" height="100">
	<Aside.Header>
		<Anchor href="#">Airel</Anchor>
		<Divider />
	</Aside.Header>

	<Aside.Section>
		<Menu.Container>
			{#each links as link}
				<a href={link.href} sveltekit:prefetch>
					<Menu.Button active={link === activeLink}>{link.label}</Menu.Button>
				</a>
			{/each}
			<a href={'#'} on:click={logout}>
				<Menu.Button>Logout</Menu.Button>
			</a>
		</Menu.Container>
	</Aside.Section>
</Aside.Container> -->
