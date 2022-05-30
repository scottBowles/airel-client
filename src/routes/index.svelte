<script>
	import { Container, Heading, Text } from '@kahi-ui/framework';
	import DiGithubBadge from 'svelte-icons/di/DiGithubBadge.svelte';
</script>

<div class="spacer" />

<Container>
	<Heading is="h1">Welcome</Heading>

	<div class="spacer" />

	<Text>Hey check it out. We have a site!</Text>
	<div class="spacer-sm" />
	<Text>Look around and see what's here. Not much yet. But think of the possibilities!</Text>

	<div class="spacer" />

	<Heading is="h3">How you can help</Heading>

	<div class="spacer" />

	<Heading is="h5">Add Content</Heading>
	<div class="spacer-sm" />
	<Text>
		Even if it's just a name and a quick description of your favorite NPC, anything is a start. You
		can also upload images. Each item can have multiple, so it's perfectly fine if we have the
		official representation (Noel's drawing from Roll20) alongside others you all find or create.
	</Text>

	<div class="spacer" />

	<Heading is="h5">Design Help</Heading>
	<div class="spacer-sm" />
	<Text>
		Style — Come up with a color scheme. Find a cool font. Design a page's layout. Find a better
		banner for a page. Make a suggestion. Report a bug. Don't be shy. We can try anything and can
		always change things.
	</Text>
	<div class="spacer-sm" />
	<Text>
		Content — Suggest a new page or a new feature. The pages are currently pretty bare. Most things
		just have a name, description, and freeform area. Most should have more. For instance, a Place
		might have a population, a type (is it a planet a town or what?), common races, associations,
		etc. Let's think it through and I'll make it happen!
	</Text>
	<div class="spacer-sm" />
	<Text>
		The best way to make a suggestion is to create an issue on <a
			href="https://github.com/scottBowles/airel-client/issues"
			rel="external noopener noreferrer"
			target="_blank">GitHub<span class="gh-icon"><DiGithubBadge /></span></a
		> (you'll have to make an account but that's simple enough). There anyone who wants can discuss and
		track progress made. You can also see and help with some things I have in mind already. Feel free
		to comment on anything.
	</Text>
	<div class="spacer-sm" />
	<Text>
		If you're really feeling into it and want to learn, you're also welcome to help with the code.
		But that's beyond the scope of this page and I don't expect many takers.
	</Text>

	<div class="spacer" />

	<Text>Enjoy! I'm looking forward to seeing what this space can be!</Text>

	<div class="spacer" />

	<div class="spacer" />
</Container>

<div class="spacer" />

<style>
	.spacer-sm {
		height: 1rem;
	}
	.spacer {
		height: 2rem;
	}

	a {
		color: #908149;
	}

	a:hover {
		text-decoration: underline;
	}

	.gh-icon {
		display: inline-block;
		height: 21px;
		width: 21px;
		vertical-align: text-bottom;
	}
</style>
