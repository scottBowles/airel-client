<script lang="ts">
	import { logByGameDate } from '$lib/utils';
	import type { PageData } from './$houdini';
	import FaCaretDown from 'svelte-icons/fa/FaCaretDown.svelte';
	import FaExternalLinkAlt from 'svelte-icons/fa/FaExternalLinkAlt.svelte';

	export let data: PageData;
	$: ({ GameLogs } = data);
	$: logs = $GameLogs?.data?.gameLogs?.edges?.map(({ node }) => node).sort(logByGameDate) || [];

	const exampleDate = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
	const exampleBrief =
		"A group of adventurers is sent on a mission to blow up a floating island that has appeared at the same time as an army of robots. They are given sonic detonators and go-pros to help them complete the mission. The group is briefed on the robots' abilities and weaknesses, as well";
	const exampleSynopsis = `Darnit and General Arrow are on their way to the island of Dr. Whidmoreeau when Tre Arrow shows up with a briefcase full of equipment. He tells them that the bot army is outnumbering the Freelander forces so they can\'t get through without using EMP. They have an island in the center of the map where they want to target. LeFlur comes back with two giant boxes, which she sets down and puts into boxes. She says that there\'s no organic man at all, but that they know it\'s accessible by some griffon-like creatures. The group decides to blow up the island from orbit. It\'s just a simple operation: fly to the Island, set up four boxes on the corners, get away only 60 feet away, and use hysterical detonating devices to disrupt the entire operation. Hrothef asks about the other weapons available for the group, and LeFler says that they don\'t really need anything more than a few bullets. They also think that the islands might be vulnerable to EMP attacks because they seem to possess something called a "hive mind" system. When asked what kind of weaponries the bots carry, Izar replies that they mostly expect Confederation gear. Their attack will probably take place during the sunset, so they plan to shoot at the sun as it rises. As they discuss the bombs, Dorinda becomes nervous about the possibility of being captured by one of the rebels. She wants to keep her distance from the rest of the party since she knows how to dodge any Emps that come after them. In fact, she has been thinking that she can hide behind Sefarinana so that she won\'t be seen by anyone else. Finally, they decide to arm the boxes and put them on the island. They give instructions on how each box should be set up and how to arm parachutes like ropes. After setting up the boxes, Dumbleda flees over the thing. On the island, Dorida sees strange plates on the building. She starts placing her bomb, even though she doesn\'t know exactly what it is. Two robots walk out onto the island carrying twelve bots. One of them knocks off the island while another shoots at him. Both men try to figure out what\'s going on, but both realize that`;
</script>

<div class="container max-w-5xl mx-auto p-4">
	<h1 class="text-4xl font-bold mb-8">Game Logs</h1>
	<ul>
		{#each logs as log (log.id)}
			<li class="mb-8">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<article tabindex="0" class={`collapse group`}>
					<div class="card w-full bg-base-200 group-focus:bg-base-300 text-base-content shadow-xl">
						<div class="card-body collapse-title">
							<div class="md:flex justify-between gap-4">
								<h2 class="card-title mb-2">
									<span>
										{log.title}
										<a href={log.url} target="_blank" rel="noopener noreferrer" class="ml-2 flex-1">
											<span class="icon inline-block hover:text-accent"><FaExternalLinkAlt /></span>
										</a>
									</span>
								</h2>
								<h6 class="card-subtitle whitespace-nowrap">
									{log.gameDate
										? new Date(log.gameDate).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'short',
												day: 'numeric'
										  })
										: exampleDate}
								</h6>
							</div>
							<p>{log.brief || exampleBrief}</p>
						</div>
						<div class="collapse-content">
							{log.synopsis || exampleSynopsis}
						</div>
						<div class="w-full text-center">
							<span class="icon group-focus:hidden"><FaCaretDown /></span>
						</div>
					</div>
				</article>
			</li>
		{/each}
	</ul>
</div>

<style>
	.icon {
		display: inline-block;
		height: 16px;
		width: 16px;
	}
</style>
