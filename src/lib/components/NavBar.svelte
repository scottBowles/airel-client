<script lang="ts">
	import { Anchor, Divider, Menu, Omni, Text } from '@kahi-ui/framework';
	import { page } from '$app/stores';

	$: currentHref = '/' + $page.url.pathname.split('/')[1];

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

	$: activeLink = links.find((link) => link.href === currentHref);
</script>

<svelte:head>
	<title>{activeLink.label}</title>
</svelte:head>

<Omni.Container palette="dark" width="100">
	<Omni.Header>
		<Anchor href="#">Airel</Anchor>
		<Divider orientation="vertical" />
		<Anchor href="#">
			<Text is="small">Between Two Suns</Text>
		</Anchor>
	</Omni.Header>

	<Omni.Section>
		<Menu.Container orientation="horizontal" sizing="tiny">
			{#each links as link}
				<a href={link.href} sveltekit:prefetch>
					<Menu.Button active={link === activeLink}>{link.label}</Menu.Button>
				</a>
			{/each}
		</Menu.Container>
	</Omni.Section>

	<Omni.Footer>
		<Menu.Container orientation="horizontal" sizing="tiny">
			<Menu.Button>GitHub</Menu.Button>
		</Menu.Container>
	</Omni.Footer>
</Omni.Container>
