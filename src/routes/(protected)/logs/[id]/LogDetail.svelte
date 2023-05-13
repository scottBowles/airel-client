<script lang="ts">
	import { fragment, graphql, type LogDetailFields } from '$houdini';
	import FaExternalLinkAlt from 'svelte-icons/fa/FaExternalLinkAlt.svelte';
	import { prop } from 'ramda';

	export let log: LogDetailFields;

	$: data = fragment(
		log,
		graphql(`
			fragment LogDetailFields on GameLog {
				url
				title
				gameDate
				brief
				synopsis
				placesSetIn {
					edges {
						node {
							id
							name
						}
					}
				}
			}
		`)
	);

	$: ({ url, title, gameDate, brief, synopsis, placesSetIn } = $data);
	$: places = placesSetIn?.edges?.map(prop('node'));
	$: dateDisplay =
		gameDate &&
		new Date(gameDate).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});

	const exampleDate = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
	const exampleBrief =
		"A group of adventurers is sent on a mission to blow up a floating island that has appeared at the same time as an army of robots. They are given sonic detonators and go-pros to help them complete the mission. The group is briefed on the robots' abilities and weaknesses, as well";
	const exampleSynopsis = `Darnit and General Arrow are on their way to the island of Dr. Whidmoreeau when Tre Arrow shows up with a briefcase full of equipment. He tells them that the bot army is outnumbering the Freelander forces so they can\'t get through without using EMP. They have an island in the center of the map where they want to target. LeFlur comes back with two giant boxes, which she sets down and puts into boxes. She says that there\'s no organic man at all, but that they know it\'s accessible by some griffon-like creatures. The group decides to blow up the island from orbit. It\'s just a simple operation: fly to the Island, set up four boxes on the corners, get away only 60 feet away, and use hysterical detonating devices to disrupt the entire operation. Hrothef asks about the other weapons available for the group, and LeFler says that they don\'t really need anything more than a few bullets. They also think that the islands might be vulnerable to EMP attacks because they seem to possess something called a "hive mind" system. When asked what kind of weaponries the bots carry, Izar replies that they mostly expect Confederation gear. Their attack will probably take place during the sunset, so they plan to shoot at the sun as it rises. As they discuss the bombs, Dorinda becomes nervous about the possibility of being captured by one of the rebels. She wants to keep her distance from the rest of the party since she knows how to dodge any Emps that come after them. In fact, she has been thinking that she can hide behind Sefarinana so that she won\'t be seen by anyone else. Finally, they decide to arm the boxes and put them on the island. They give instructions on how each box should be set up and how to arm parachutes like ropes. After setting up the boxes, Dumbleda flees over the thing. On the island, Dorida sees strange plates on the building. She starts placing her bomb, even though she doesn\'t know exactly what it is. Two robots walk out onto the island carrying twelve bots. One of them knocks off the island while another shoots at him. Both men try to figure out what\'s going on, but both realize that`;
	const examplePlaces = [
		{
			id: '3',
			name: 'Red Sun'
		},
		{
			id: '1',
			name: 'Magmus'
		},
		{
			id: '2',
			name: 'The Battlefield'
		}
	];
</script>

<article class="container max-w-5xl mx-auto p-8">
	<div class="md:flex justify-between gap-4">
		<h2 class="card-title mb-2">
			<span>
				{title}
				<a href={url} target="_blank" rel="noopener noreferrer" class="ml-2 flex-1">
					<span class="icon inline-block hover:text-accent"><FaExternalLinkAlt /></span>
				</a>
			</span>
		</h2>
		<h6 class="whitespace-nowrap">
			{dateDisplay || exampleDate}
		</h6>
	</div>
	<p class="mt-8 italic">{brief || exampleBrief}</p>
	<div class="mt-8 flex flex-wrap gap-2">
		{#each places.length ? places : examplePlaces as place (place.id)}
			<div class="badge p-3">{place.name}</div>
		{/each}
	</div>
	<div class="mt-8">
		{synopsis || exampleSynopsis}
	</div>
</article>

<style>
	.icon {
		display: inline-block;
		height: 16px;
		width: 16px;
	}
</style>
