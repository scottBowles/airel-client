<svelte:options runes={true} />

<script lang="ts">
	import { fragment, graphql, LockStore, type LogDetailFields } from '$houdini';
	import FaExternalLinkAlt from 'svelte-icons/fa/FaExternalLinkAlt.svelte';
	import FaEdit from 'svelte-icons/fa/FaEdit.svelte';
	import { prop } from 'ramda';
	import { adjustForTimezone, fromGlobalId } from '$lib/utils';
	import FoundInThisLogEntity from './FoundInThisLogEntity.svelte';
	import { page } from '$app/stores';

	const lockForEditMutation = new LockStore();

	let { log } = $props<{ log: LogDetailFields }>();

	let { me } = $derived($page.data);
	let data = $derived(
		fragment(
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
		)
	);

	let { id, url, title, gameDate, brief, synopsis, lockUser } = $derived($data);
	let placesSetIn = $derived($data.placesSetIn?.edges?.map(prop('node')));
	let artifacts = $derived($data.artifacts?.edges?.map(prop('node')));
	let associations = $derived($data.associations?.edges?.map(prop('node')));
	let characters = $derived($data.characters?.edges?.map(prop('node')));
	let items = $derived($data.items?.edges?.map(prop('node')));
	let places = $derived($data.places?.edges?.map(prop('node')));
	let races = $derived($data.races?.edges?.map(prop('node')));
	let dateDisplay = $derived(
		gameDate &&
			adjustForTimezone(gameDate).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			})
	);

	const onEditClick = () => lockForEditMutation.mutate({ id });

	const exampleDate = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
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
			<p class="mt-8 italic">{brief || ''}</p>

			<div class="mt-8">
				<h3 class="font-bold mb-2">Set in</h3>
				<div class="flex flex-wrap gap-2">
					{#each placesSetIn as place (place.id)}
						<a
							href={`/places/${fromGlobalId(place.id).id}`}
							class="badge hover:underline hover:text-accent p-3">{place.name}</a
						>
					{/each}
				</div>
			</div>
			<div class="mt-8">
				{synopsis || ''}
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
