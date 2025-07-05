<svelte:options runes={true} />

<script lang="ts">
	import { page } from '$app/state';
	import { fragment, graphql, LockStore, type LogDetailFields } from '$houdini';
	import { adjustForTimezone } from '$lib/utils';
	import { prop } from 'ramda';
	import FoundInThisLogEntity from './FoundInThisLogEntity.svelte';

	const lockForEditMutation = new LockStore();

	let { log }: { log: LogDetailFields } = $props();

	let { me } = $derived(page.data);
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
	<div class="mb-2 flex justify-between gap-4">
		<h2 class="card-title">
			<span>
				{title}
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					class="ml-2 flex-1"
					aria-label="External link to log"
				>
					<span class="icon icon-[fa-solid--external-link-alt] hover:text-accent"></span></a
				>
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
					onclick={onEditClick}
					aria-label="Edit"
				>
					<span class="icon icon-[fa-solid--edit]"></span>
				</button>
			</div>
		{/if}
	</div>

	<hr class="mb-8" />

	<div class="flex flex-col gap-16 sm:flex-row">
		<div class="flex flex-2 flex-col gap-2">
			<h2 class="my-4 text-xl font-bold">Details</h2>

			<h6 class="whitespace-nowrap">
				{dateDisplay || exampleDate}
			</h6>
			<p class="mt-8 italic">{brief || ''}</p>

			<div class="mt-8">
				<h3 class="mb-2 font-bold">Set in</h3>
				<div class="flex flex-wrap gap-2">
					{#each placesSetIn as place (place.id)}
						<a
							href={`/places/${place.id}`}
							class="badge badge-accent badge-outline hover:text-accent p-3 hover:underline"
							>{place.name}</a
						>
					{/each}
				</div>
			</div>
			<div class="mt-8">
				{synopsis || ''}
			</div>
		</div>

		<div class="flex flex-1 flex-col items-center">
			<h2 class="my-4 text-xl font-bold">Found in this Log</h2>

			<div class="flex w-full flex-col gap-2">
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
