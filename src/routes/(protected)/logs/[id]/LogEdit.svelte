<script lang="ts">
	import { parseFormData } from 'parse-nested-form-data';
	import { uniq } from 'ramda';
	import {
		fragment,
		graphql,
		UnlockStore,
		UpdateLogStore,
		type LogEditFields,
		ArtifactNamesAndIdsStore,
		// GenerateAiLogSummaryStore,
		type LogEditFields$data,
		AiLogSuggestionsStore
	} from '$houdini';
	import FaRobot from 'svelte-icons/fa/FaRobot.svelte';
	import FaSave from 'svelte-icons/fa/FaSave.svelte';
	import FaUndoAlt from 'svelte-icons/fa/FaUndoAlt.svelte';
	import RelatedPlaceMultiSelect from '$lib/components/RelatedPlaceMultiSelect.svelte';
	import RelatedItemMultiSelect from '$lib/components/RelatedItemMultiSelect.svelte';
	import RelatedRaceMultiSelect from '$lib/components/RelatedRaceMultiSelect.svelte';
	import RelatedAssociationMultiSelect from '$lib/components/RelatedAssociationMultiSelect.svelte';
	import RelatedCharacterMultiSelect from '$lib/components/RelatedCharacterMultiSelect.svelte';
	import RelatedArtifactMultiSelect from '$lib/components/RelatedArtifactMultiSelect.svelte';
	import { idFromEdge } from '../../places/utils';
	import { fromGlobalId, somethingWentWrong } from '$lib/utils';
	import { browser } from '$app/environment';
	import uniqStrArrStore from '$lib/utils/clientOnly/strArrStore';
	import PossibleEntityList from './PossibleEntityList.svelte';
	import { ENTITY_TYPE, type EntityType } from '$lib/constants';
	import { page } from '$app/stores';
	import AddAiSuggestion from './AddAiSuggestion.svelte';
	import AddEntityOrAliasBtn from './AddEntityOrAliasBtn.svelte';

	const aiLogSuggestions = new AiLogSuggestionsStore();
	// const generateAiLogSummary = new GenerateAiLogSummaryStore();
	const unlockMutation = new UnlockStore();
	const updateLog = new UpdateLogStore();
	const artifactNamesAndIdsQuery = new ArtifactNamesAndIdsStore();

	$: browser && artifactNamesAndIdsQuery.fetch();
	$: pk = $page.params.id;
	$: ({ me } = $page.data);

	export let log: LogEditFields;

	$: data = fragment(
		log,
		graphql(`
			fragment LogEditFields on GameLog {
				id
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
						}
					}
				}
				artifacts {
					edges {
						node {
							id
						}
					}
				}
				associations {
					edges {
						node {
							id
						}
					}
				}
				characters {
					edges {
						node {
							id
						}
					}
				}
				items {
					edges {
						node {
							id
						}
					}
				}
				places {
					edges {
						node {
							id
						}
					}
				}
				races {
					edges {
						node {
							id
						}
					}
				}
			}
		`)
	);

	$: aiSuggestions = $aiLogSuggestions.data?.gameLog?.aiSuggestions;
	// $: aiLogSummary = $generateAiLogSummary.data?.aiLogSuggestions;
	// $: aiLogSummaryErrors = $generateAiLogSummary.errors;
	$: ({ foundArtifacts, foundAssociations, foundCharacters, foundItems, foundPlaces, foundRaces } =
		aiSuggestions || {
			foundArtifacts: [],
			foundAssociations: [],
			foundCharacters: [],
			foundItems: [],
			foundPlaces: [],
			foundRaces: []
		});
	$: allFoundEntityNames = [
		...foundArtifacts.map((a) => a.name),
		...foundAssociations.map((a) => a.name),
		...foundCharacters.map((a) => a.name),
		...foundItems.map((a) => a.name),
		...foundPlaces.map((a) => a.name),
		...foundRaces.map((a) => a.name)
	];
	$: updateFoundEntities = (type: EntityType, newEntity: any) => {
		switch (type) {
			case 'Artifact':
				foundArtifacts = uniq([...foundArtifacts, newEntity]);
				break;
			case 'Association':
				foundAssociations = uniq([...foundAssociations, newEntity]);
				break;
			case 'Character':
				foundCharacters = uniq([...foundCharacters, newEntity]);
				break;
			case 'Item':
				foundItems = uniq([...foundItems, newEntity]);
				break;
			case 'Place':
				foundPlaces = uniq([...foundPlaces, newEntity]);
				break;
			case 'Race':
				foundRaces = uniq([...foundRaces, newEntity]);
				break;
			default:
				throw new Error(`Unknown entity type: ${type}`);
		}
	};

	$: ({ id, title, gameDate, brief, synopsis, lockUser } = $data);

	$: placesSetInIds = $data.placesSetIn.edges.map(idFromEdge);

	const artifactIds = uniqStrArrStore();
	const associationIds = uniqStrArrStore();
	const characterIds = uniqStrArrStore();
	const itemIds = uniqStrArrStore();
	const placeIds = uniqStrArrStore();
	const raceIds = uniqStrArrStore();

	function setStoresFromData(data: LogEditFields$data) {
		artifactIds.set(data.artifacts.edges.map(idFromEdge));
		associationIds.set(data.associations.edges.map(idFromEdge));
		characterIds.set(data.characters.edges.map(idFromEdge));
		itemIds.set(data.items.edges.map(idFromEdge));
		placeIds.set(data.places.edges.map(idFromEdge));
		raceIds.set(data.races.edges.map(idFromEdge));
	}

	function updateLogEntitiesInForm(id: string) {
		const entityType = fromGlobalId(id).type as EntityType;
		const store = {
			[ENTITY_TYPE.ARTIFACT]: artifactIds,
			[ENTITY_TYPE.ASSOCIATION]: associationIds,
			[ENTITY_TYPE.CHARACTER]: characterIds,
			[ENTITY_TYPE.ITEM]: itemIds,
			[ENTITY_TYPE.PLACE]: placeIds,
			[ENTITY_TYPE.RACE]: raceIds
		}[entityType];
		store.add(id);
	}

	$: setStoresFromData($data);

	const unlock = () => unlockMutation.mutate({ id });

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		const gameDate = parsed.gameDate ? new Date(parsed.gameDate as string) : null;
		parsed.placesSetIn ??= { set: [] };
		parsed.artifacts ??= { set: [] };
		parsed.associations ??= { set: [] };
		parsed.characters ??= { set: [] };
		parsed.items ??= { set: [] };
		parsed.places ??= { set: [] };
		parsed.races ??= { set: [] };
		const res = await updateLog.mutate({ id, ...parsed, gameDate });
		if (res.errors) {
			somethingWentWrong(res.errors[0].message);
		}
	};

	const modalId = `discard-changes-modal-${id}`;
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<div class="container mx-auto mt-8 mb-32 px-8">
		<div class="mb-8 flex flex-wrap items-center justify-between gap-4">
			<h1 class="text-3xl font-bold">Edit Log</h1>

			<div class="flex min-w-fit items-center gap-8">
				<span>Locked by {lockUser?.username ?? 'Unknown'}</span>

				<div class="tooltip" data-tip="Discard changes">
					<label for={modalId} class="btn btn-ghost btn-sm icon-btn modal-button">
						<span class="icon"><FaUndoAlt /></span>
					</label>
				</div>
				<input type="checkbox" id={modalId} class="modal-toggle" />
				<label for={modalId} class="modal modal-bottom sm:modal-middle cursor-pointer">
					<label class="modal-box relative" for="">
						<h3 class="text-lg font-bold">Discard changes</h3>
						<p class="py-4">Are you sure you want to discard any unsaved changes?</p>
						<div class="modal-action">
							<label for={modalId} class="btn btn-neutral" on:click={unlock} on:keypress={unlock}
								>Yes</label
							>
							<label for={modalId} class="btn btn-neutral">No</label>
						</div>
					</label>
				</label>

				<div class="tooltip" data-tip="Save">
					<button type="submit" class="btn btn-ghost btn-sm icon-btn"
						><span class="icon"><FaSave /></span></button
					>
				</div>
			</div>
		</div>
		<hr class="mb-8" />

		<div class="flex flex-col gap-16 sm:flex-row">
			<div class="flex flex-[2] flex-col gap-2">
				<h2 class="my-4 text-xl font-bold">Details</h2>

				<div class="form-control">
					<label for="title-input" class="label">
						<span class="label-text">Title</span>
					</label>
					<input type="text" id="title-input" name="title" value={title} class="input" required />
				</div>
				<div class="form-control">
					<label for="game-date" class="label">
						<span class="label-text">Game Date</span>
					</label>
					<input
						type="date"
						id="game-date"
						name="gameDate"
						value={gameDate?.toISOString().substring(0, 10) ?? ''}
						class="input"
						required
					/>
				</div>
				<div class="form-control">
					<label for="brief" class="label">
						<span class="label-text">Brief</span>
					</label>
					<textarea id="brief" name="brief" class="textarea w-full" value={brief} required
					></textarea>
				</div>
				<div class="form-control">
					<label for="synopsis" class="label">
						<span class="label-text">Synopsis</span>
					</label>
					<textarea
						id="synopsis"
						name="synopsis"
						class="textarea h-auto w-full"
						rows="6"
						value={synopsis}
						required
					></textarea>
				</div>
				<div class="max-w-xs">
					<RelatedPlaceMultiSelect
						id={`log-${id}-place-select`}
						inputGroupName="placesSetIn"
						entityDisplayName="Places Set In"
						ids={placesSetInIds}
					/>
				</div>
			</div>

			<div class="flex flex-1 flex-col items-center">
				<h2 class="my-4 text-xl font-bold">Found in this Log</h2>

				<div class="flex w-full flex-col gap-2">
					<RelatedArtifactMultiSelect
						id={`log-${id}-artifact-select`}
						inputGroupName="artifacts"
						entityDisplayName="Artifacts"
						bind:ids={$artifactIds}
					/>
					<RelatedAssociationMultiSelect
						id="related-association-select"
						inputGroupName="associations"
						bind:ids={$associationIds}
					/>
					<RelatedCharacterMultiSelect
						id="related-character-select"
						inputGroupName="characters"
						bind:ids={$characterIds}
					/>
					<RelatedItemMultiSelect
						id="related-item-select"
						inputGroupName="items"
						bind:ids={$itemIds}
					/>
					<RelatedPlaceMultiSelect
						id="related-place-select"
						inputGroupName="places"
						bind:ids={$placeIds}
					/>
					<RelatedRaceMultiSelect
						id="related-race-select"
						inputGroupName="races"
						bind:ids={$raceIds}
					/>
				</div>
			</div>
		</div>
	</div>
</form>

{#if me?.isStaff}
	<AddAiSuggestion {id} />

	{#if $aiLogSuggestions.errors}
		Error loading AI Suggestions: {new Intl.ListFormat('en-US', { style: 'long' }).format(
			$aiLogSuggestions.errors.map((error) => error.message)
		)}
	{:else if aiSuggestions}
		<div class="container mx-auto mb-32 px-8">
			<div class="pb-8 text-lg font-bold">Ai Suggestions</div>
			<div class="mb-6">
				<div class="mb-4">
					<div class="text-lg font-bold">Titles</div>
					{#each aiSuggestions.titles as suggestedTitle}
						<div>{suggestedTitle}</div>
						<button
							type="button"
							on:click={() => (title = suggestedTitle ?? null)}
							class="link text-accent no-underline hover:underline">Use</button
						>
					{/each}
				</div>
				<div class="mb-4">
					<div class="text-lg font-bold">Briefs</div>
					{#each aiSuggestions.briefs as suggestedBrief}
						<div>{suggestedBrief}</div>
						<button
							type="button"
							on:click={() => (brief = suggestedBrief ?? null)}
							class="link text-accent no-underline hover:underline">Use</button
						>
					{/each}
				</div>
				<div class="mb-4">
					<div class="text-lg font-bold">Synopses</div>
					{#each aiSuggestions.synopses as suggestedSynopsis}
						<div>{suggestedSynopsis}</div>
						<button
							type="button"
							on:click={() => (synopsis = suggestedSynopsis ?? null)}
							class="link text-accent no-underline hover:underline">Use</button
						>
					{/each}
				</div>
			</div>

			<div class="mb-6 flex gap-8">
				<div>
					<AddEntityOrAliasBtn
						entityName=""
						{updateFoundEntities}
						{updateLogEntitiesInForm}
						verbose
					/>
				</div>
			</div>

			<h3 class="mb-4 text-xl font-bold">Possible Entities</h3>
			<div class="mb-6 grid grid-cols-5">
				<PossibleEntityList
					suggestedEntityType={ENTITY_TYPE.ASSOCIATION}
					entityNames={aiSuggestions.associations.filter((a) => !allFoundEntityNames.includes(a))}
					{updateFoundEntities}
					{updateLogEntitiesInForm}
				/>
				<PossibleEntityList
					suggestedEntityType={ENTITY_TYPE.CHARACTER}
					entityNames={aiSuggestions.characters.filter((c) => !allFoundEntityNames.includes(c))}
					{updateFoundEntities}
					{updateLogEntitiesInForm}
				/>
				<PossibleEntityList
					suggestedEntityType={ENTITY_TYPE.ITEM}
					entityNames={aiSuggestions.items.filter((i) => !allFoundEntityNames.includes(i))}
					{updateFoundEntities}
					{updateLogEntitiesInForm}
				/>
				<PossibleEntityList
					suggestedEntityType={ENTITY_TYPE.PLACE}
					entityNames={aiSuggestions.places.filter((p) => !allFoundEntityNames.includes(p))}
					{updateFoundEntities}
					{updateLogEntitiesInForm}
				/>
				<PossibleEntityList
					suggestedEntityType={ENTITY_TYPE.RACE}
					entityNames={aiSuggestions.races.filter((r) => !allFoundEntityNames.includes(r))}
					{updateFoundEntities}
					{updateLogEntitiesInForm}
				/>
			</div>

			<h3 class="mb-4 text-xl font-bold">Found Entities</h3>
			<div class="mb-6 grid grid-cols-6">
				<div>
					<div class="text-lg font-bold">Artifacts</div>
					{#each foundArtifacts.filter((a) => !$artifactIds.includes(a.id)) as foundArtifact (foundArtifact.id)}
						<div>
							<button
								type="button"
								class="link text-accent no-underline hover:underline"
								on:click={() => artifactIds.add(foundArtifact.id)}>&plus;</button
							>
							{foundArtifact.name}
						</div>
					{/each}
				</div>
				<div>
					<div class="text-lg font-bold">Associations</div>
					{#each foundAssociations.filter((a) => !$associationIds.includes(a.id)) as foundAssociation (foundAssociation.id)}
						<div>
							<button
								type="button"
								class="link text-accent no-underline hover:underline"
								on:click={() => associationIds.add(foundAssociation.id)}>&plus;</button
							>
							{foundAssociation.name}
						</div>
					{/each}
				</div>
				<div>
					<div class="text-lg font-bold">Characters</div>
					{#each foundCharacters.filter((c) => !$characterIds.includes(c.id)) as foundCharacter (foundCharacter.id)}
						<div>
							<button
								type="button"
								class="link text-accent no-underline hover:underline"
								on:click={() => characterIds.add(foundCharacter.id)}>&plus;</button
							>
							{foundCharacter.name}
						</div>
					{/each}
				</div>
				<div class="flex flex-col">
					<div class="text-lg font-bold">Items</div>
					{#each foundItems.filter((i) => !$itemIds.includes(i.id)) as foundItem (foundItem.id)}
						<div>
							<button
								type="button"
								class="link text-accent no-underline hover:underline"
								on:click={() => itemIds.add(foundItem.id)}>&plus;</button
							>
							{foundItem.name}
						</div>
					{/each}
				</div>
				<div>
					<div class="text-lg font-bold">Places</div>
					{#each foundPlaces.filter((p) => !$placeIds.includes(p.id)) as foundPlace (foundPlace.id)}
						<div>
							<button
								type="button"
								class="link text-accent no-underline hover:underline"
								on:click={() => placeIds.add(foundPlace.id)}>&plus;</button
							>
							{foundPlace.name}
						</div>
					{/each}
				</div>
				<div>
					<div class="text-lg font-bold">Races</div>
					{#each foundRaces.filter((r) => !$raceIds.includes(r.id)) as foundRace (foundRace.id)}
						<div>
							<button
								type="button"
								class="link text-accent no-underline hover:underline"
								on:click={() => raceIds.add(foundRace.id)}>&plus;</button
							>
							{foundRace.name}
						</div>
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<div class="tooltip mx-auto" data-tip="Load Ai Suggestions">
			<button
				type="button"
				class="btn btn-ghost btn-sm icon-btn"
				on:click={() => aiLogSuggestions.fetch({ variables: { pk } })}
			>
				<span class="icon"><FaRobot /></span>
			</button>
		</div>
	{/if}

	<!-- <div>
	<button
		type="button"
		on:click={() => generateAiLogSummary.fetch({ variables: { id } })}
		class="btn btn-ghost btn-sm icon-btn"
	>
		<div class="tooltip" data-tip="Generate AI Log Summary">
			<span class="icon"><FaRobot /></span>
		</div>
	</button>
</div>

{#if aiLogSummary}
	<div class="container mx-auto mt-8 mb-32 px-8">
		<div class="mb-6">
			<div class="mb-4">
				<div class="text-lg font-bold">Title</div>
				<div>{aiLogSummary.title}</div>
				<button
					type="button"
					on:click={() => (title = aiLogSummary?.title ?? null)}
					class="link text-accent no-underline hover:underline">Use</button
				>
			</div>
			<div class="mb-4">
				<div class="text-lg font-bold">Brief</div>
				<div>{aiLogSummary.brief}</div>
				<button
					type="button"
					on:click={() => (brief = aiLogSummary?.brief ?? null)}
					class="link text-accent no-underline hover:underline">Use</button
				>
			</div>
			<div class="mb-4">
				<div class="text-lg font-bold">Synopsis</div>
				<div>{aiLogSummary.synopsis}</div>
				<button
					type="button"
					on:click={() => (synopsis = aiLogSummary?.synopsis ?? null)}
					class="link text-accent no-underline hover:underline">Use</button
				>
			</div>
		</div>

		<div class="flex gap-8 mb-6">
			<div>
				<AddAliasBtn entityName={''} {updateFoundEntities} verbose />
			</div>
			<div>
				<AddEntityBtn entityName={''} {updateFoundEntities} {updateLogEntitiesInForm} verbose />
			</div>
		</div>

		<h3 class="text-xl font-bold mb-4">Possible Entities</h3>
		<div class="grid grid-cols-5 mb-6">
			<PossibleEntityList
				suggestedEntityType={ENTITY_TYPE.ASSOCIATION}
				entityNames={aiLogSummary.associations}
				{updateFoundEntities}
				{updateLogEntitiesInForm}
			/>
			<PossibleEntityList
				suggestedEntityType={ENTITY_TYPE.CHARACTER}
				entityNames={aiLogSummary.characters}
				{updateFoundEntities}
				{updateLogEntitiesInForm}
			/>
			<PossibleEntityList
				suggestedEntityType={ENTITY_TYPE.ITEM}
				entityNames={aiLogSummary.items}
				{updateFoundEntities}
				{updateLogEntitiesInForm}
			/>
			<PossibleEntityList
				suggestedEntityType={ENTITY_TYPE.PLACE}
				entityNames={aiLogSummary.places}
				{updateFoundEntities}
				{updateLogEntitiesInForm}
			/>
			<PossibleEntityList
				suggestedEntityType={ENTITY_TYPE.RACE}
				entityNames={aiLogSummary.races}
				{updateFoundEntities}
				{updateLogEntitiesInForm}
			/>
		</div>

		<h3 class="text-xl font-bold mb-4">Found Entities</h3>
		<div class="grid grid-cols-6 mb-6">
			<div>
				<div class="text-lg font-bold">Artifacts</div>
				{#each foundArtifacts.filter((a) => !$artifactIds.includes(a.id)) as foundArtifact (foundArtifact.id)}
					<div>
						<button
							type="button"
							class="link text-accent no-underline hover:underline"
							on:click={() => artifactIds.add(foundArtifact.id)}>&plus;</button
						>
						{foundArtifact.name}
					</div>
				{/each}
			</div>
			<div>
				<div class="text-lg font-bold">Associations</div>
				{#each foundAssociations.filter((a) => !$associationIds.includes(a.id)) as foundAssociation (foundAssociation.id)}
					<div>
						<button
							type="button"
							class="link text-accent no-underline hover:underline"
							on:click={() => associationIds.add(foundAssociation.id)}>&plus;</button
						>
						{foundAssociation.name}
					</div>
				{/each}
			</div>
			<div>
				<div class="text-lg font-bold">Characters</div>
				{#each foundCharacters.filter((c) => !$characterIds.includes(c.id)) as foundCharacter (foundCharacter.id)}
					<div>
						<button
							type="button"
							class="link text-accent no-underline hover:underline"
							on:click={() => characterIds.add(foundCharacter.id)}>&plus;</button
						>
						{foundCharacter.name}
					</div>
				{/each}
			</div>
			<div class="flex flex-col">
				<div class="text-lg font-bold">Items</div>
				{#each foundItems.filter((i) => !$itemIds.includes(i.id)) as foundItem (foundItem.id)}
					<div>
						<button
							type="button"
							class="link text-accent no-underline hover:underline"
							on:click={() => itemIds.add(foundItem.id)}>&plus;</button
						>
						{foundItem.name}
					</div>
				{/each}
			</div>
			<div>
				<div class="text-lg font-bold">Places</div>
				{#each foundPlaces.filter((p) => !$placeIds.includes(p.id)) as foundPlace (foundPlace.id)}
					<div>
						<button
							type="button"
							class="link text-accent no-underline hover:underline"
							on:click={() => placeIds.add(foundPlace.id)}>&plus;</button
						>
						{foundPlace.name}
					</div>
				{/each}
			</div>
			<div>
				<div class="text-lg font-bold">Races</div>
				{#each foundRaces.filter((r) => !$raceIds.includes(r.id)) as foundRace (foundRace.id)}
					<div>
						<button
							type="button"
							class="link text-accent no-underline hover:underline"
							on:click={() => raceIds.add(foundRace.id)}>&plus;</button
						>
						{foundRace.name}
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

{#if aiLogSummaryErrors?.length}
	<div class="mb-96">
		{#each aiLogSummaryErrors as error}
			<div class="text-red-500">{error.message}</div>
		{/each}
	</div>
{/if} -->
{/if}

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
