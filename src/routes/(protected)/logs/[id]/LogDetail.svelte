<script lang="ts">
	import { fragment, graphql, LockStore, type LogDetailFields } from '$houdini';
	import FaExternalLinkAlt from 'svelte-icons/fa/FaExternalLinkAlt.svelte';
	import { prop } from 'ramda';
	import FaEdit from 'svelte-icons/fa/FaEdit.svelte';
	import { adjustForTimezone, fromGlobalId } from '$lib/utils';
	import FoundInThisLogEntity from './FoundInThisLogEntity.svelte';
	import { page } from '$app/stores';

	const lockForEditMutation = new LockStore();

	export let log: LogDetailFields;

	$: ({ me } = $page.data);
	$: data = fragment(
		log,
		graphql(`
			fragment LogDetailFields on GameLog {
				id
				url
				title
				gameDate
				brief
				synopsis
				lockUser {
					username
				}
				placesSetIn {
					edges {
						node {
							id
							name
						}
					}
				}
				artifacts {
					edges {
						node {
							id
							name
						}
					}
				}
				associations {
					edges {
						node {
							id
							name
						}
					}
				}
				characters {
					edges {
						node {
							id
							name
						}
					}
				}
				items {
					edges {
						node {
							id
							name
						}
					}
				}
				places {
					edges {
						node {
							id
							name
						}
					}
				}
				races {
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

	$: ({ id, url, title, gameDate, brief, synopsis, lockUser } = $data);
	$: placesSetIn = $data.placesSetIn?.edges?.map(prop('node'));
	$: artifacts = $data.artifacts?.edges?.map(prop('node'));
	$: associations = $data.associations?.edges?.map(prop('node'));
	$: characters = $data.characters?.edges?.map(prop('node'));
	$: items = $data.items?.edges?.map(prop('node'));
	$: places = $data.places?.edges?.map(prop('node'));
	$: races = $data.races?.edges?.map(prop('node'));
	$: dateDisplay =
		gameDate &&
		adjustForTimezone(gameDate).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});

	const onEditClick = () => lockForEditMutation.mutate({ id });

	const exampleDate = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
	const exampleBrief =
		"A group of adventurers is sent on a mission to blow up a floating island that has appeared at the same time as an army of robots. They are given sonic detonators and go-pros to help them complete the mission. The group is briefed on the robots' abilities and weaknesses, as well";
	const exampleSynopsis = `Darnit and General Arrow are on their way to the island of Dr. Whidmoreeau when Tre Arrow shows up with a briefcase full of equipment. He tells them that the bot army is outnumbering the Freelander forces so they can't get through without using EMP. They have an island in the center of the map where they want to target. LeFlur comes back with two giant boxes, which she sets down and puts into boxes. She says that there's no organic man at all, but that they know it's accessible by some griffon-like creatures. The group decides to blow up the island from orbit. It's just a simple operation: fly to the Island, set up four boxes on the corners, get away only 60 feet away, and use hysterical detonating devices to disrupt the entire operation. Hrothef asks about the other weapons available for the group, and LeFler says that they don't really need anything more than a few bullets. They also think that the islands might be vulnerable to EMP attacks because they seem to possess something called a "hive mind" system. When asked what kind of weaponries the bots carry, Izar replies that they mostly expect Confederation gear. Their attack will probably take place during the sunset, so they plan to shoot at the sun as it rises. As they discuss the bombs, Dorinda becomes nervous about the possibility of being captured by one of the rebels. She wants to keep her distance from the rest of the party since she knows how to dodge any Emps that come after them. In fact, she has been thinking that she can hide behind Sefarinana so that she won't be seen by anyone else. Finally, they decide to arm the boxes and put them on the island. They give instructions on how each box should be set up and how to arm parachutes like ropes. After setting up the boxes, Dumbleda flees over the thing. On the island, Dorida sees strange plates on the building. She starts placing her bomb, even though she doesn't know exactly what it is. Two robots walk out onto the island carrying twelve bots. One of them knocks off the island while another shoots at him. Both men try to figure out what's going on, but both realize that`;
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

<article class="container mx-auto mt-8 mb-32 px-8">
	<div class="flex justify-between gap-4 mb-2">
		<h2 class="card-title">
			<span>
				{title}
				<a href={url} target="_blank" rel="noopener noreferrer" class="ml-2 flex-1">
					<span class="icon inline-block hover:text-accent"><FaExternalLinkAlt /></span>
				</a>
			</span>
		</h2>

		{#if me?.isStaff}
			{#if lockUser}
				Locked by {lockUser.username}
			{/if}
			<div class="tooltip ml-auto" data-tip="Edit">
				<button
					type="button"
					class="btn btn-ghost btn-sm icon-btn"
					disabled={!!lockUser}
					on:click={onEditClick}
				>
					<span class="icon"><FaEdit /></span>
				</button>
			</div>
		{/if}
	</div>

	<hr class="mb-8" />

	<div class="flex flex-col sm:flex-row gap-16">
		<div class="flex flex-col gap-2 flex-[2]">
			<h2 class="text-xl font-bold my-4">Details</h2>

			<h6 class="whitespace-nowrap">
				{dateDisplay || exampleDate}
			</h6>
			<p class="mt-8 italic">{brief || exampleBrief}</p>

			<div class="mt-8">
				<h3 class="font-bold mb-2">Set in</h3>
				<div class="flex flex-wrap gap-2">
					{#each placesSetIn.length ? placesSetIn : examplePlaces as place (place.id)}
						<a
							href={`/places/${fromGlobalId(place.id).id}`}
							class="badge hover:underline hover:text-accent p-3">{place.name}</a
						>
					{/each}
				</div>
			</div>
			<div class="mt-8">
				{synopsis || exampleSynopsis}
			</div>
		</div>

		<div class="flex flex-col items-center flex-1">
			<h2 class="text-xl font-bold my-4">Found in this Log</h2>

			<div class="flex flex-col gap-2 w-full">
				<FoundInThisLogEntity entities={artifacts} name="artifacts" />
				<FoundInThisLogEntity entities={associations} name="associations" />
				<FoundInThisLogEntity entities={characters} name="characters" />
				<FoundInThisLogEntity entities={items} name="items" />
				<FoundInThisLogEntity entities={places} name="places" />
				<FoundInThisLogEntity entities={races} name="races" />
			</div>
		</div>
	</div>
</article>

<style>
	.icon {
		display: inline-block;
		height: 16px;
		width: 16px;
	}

	.icon-btn:hover {
		color: #908149;
	}

	.tooltip {
		text-transform: none;
	}
</style>
