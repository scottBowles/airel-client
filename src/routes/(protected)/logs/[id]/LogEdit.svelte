<script lang="ts">
	import { page } from '$app/state';
	import {
		AiLogSuggestionsStore,
		ArtifactNamesAndIdsStore,
		fragment,
		graphql,
		UnlockStore,
		UpdateLogStore,
		type LogEditFields,
		// GenerateAiLogSummaryStore,
		type LogEditFields$data
	} from '$houdini';
	import RelatedArtifactMultiSelect from '$lib/components/RelatedArtifactMultiSelect.svelte';
	import RelatedAssociationMultiSelect from '$lib/components/RelatedAssociationMultiSelect.svelte';
	import RelatedCharacterMultiSelect from '$lib/components/RelatedCharacterMultiSelect.svelte';
	import RelatedItemMultiSelect from '$lib/components/RelatedItemMultiSelect.svelte';
	import RelatedPlaceMultiSelect from '$lib/components/RelatedPlaceMultiSelect.svelte';
	import RelatedRaceMultiSelect from '$lib/components/RelatedRaceMultiSelect.svelte';
	import { ENTITY_TYPE, type EntityType } from '$lib/constants';
	import { fromGlobalId, somethingWentWrong } from '$lib/utils';
	import uniqStrArrStore from '$lib/utils/clientOnly/strArrStore';
	import { parseFormData } from 'parse-nested-form-data';
	import { uniq } from 'ramda';
	import { onMount } from 'svelte';
	import { idFromEdge } from '../../places/utils';
	import AddAiSuggestion from './AddAiSuggestion.svelte';
	import AddEntityOrAliasBtn from './AddEntityOrAliasBtn.svelte';
	import PossibleEntityList from './PossibleEntityList.svelte';
	import TextAreaAutoGrow from '$lib/components/TextAreaAutoGrow.svelte';

	const aiLogSuggestions = new AiLogSuggestionsStore();
	// const generateAiLogSummary = new GenerateAiLogSummaryStore();
	const unlockMutation = new UnlockStore();
	const updateLog = new UpdateLogStore();
	const artifactNamesAndIdsQuery = new ArtifactNamesAndIdsStore();

	onMount(() => artifactNamesAndIdsQuery.fetch());
	let pk = $derived(page.params.id);
	let { me } = $derived(page.data);

	interface Props {
		log: LogEditFields;
	}

	let { log }: Props = $props();

	let data = $derived(
		fragment(
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
		)
	);

	let aiSuggestions = $derived(
		$aiLogSuggestions.data?.node.__typename === 'GameLog'
			? $aiLogSuggestions.data.node.aiSuggestions
			: null
	);
	// $: aiLogSummary = $generateAiLogSummary.data?.aiLogSuggestions;
	// $: aiLogSummaryErrors = $generateAiLogSummary.errors;
	let { foundArtifacts, foundAssociations, foundCharacters, foundItems, foundPlaces, foundRaces } =
		$derived(
			aiSuggestions || {
				foundArtifacts: [],
				foundAssociations: [],
				foundCharacters: [],
				foundItems: [],
				foundPlaces: [],
				foundRaces: []
			}
		);
	let allFoundEntityNames = $derived([
		...foundArtifacts.map((a) => a.name),
		...foundAssociations.map((a) => a.name),
		...foundCharacters.map((a) => a.name),
		...foundItems.map((a) => a.name),
		...foundPlaces.map((a) => a.name),
		...foundRaces.map((a) => a.name)
	]);
	let updateFoundEntities = $derived((type: EntityType, newEntity: any) => {
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
	});

	let { id, title, gameDate, brief, synopsis, lockUser } = $derived($data);

	let placesSetInIds = $derived($data.placesSetIn.edges.map(idFromEdge));

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

	$effect(() => {
		setStoresFromData($data);
	});

	const unlock = () => unlockMutation.mutate({ id });

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
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

	let modalId = $derived(`discard-changes-modal-${id}`);
</script>

<form method="POST" onsubmit={handleSubmit}>
	<div class="container mx-auto mt-8 mb-32 px-8">
		<div class="mb-8 flex flex-wrap items-center justify-between gap-4">
			<h1 class="text-3xl font-bold">Edit Log</h1>

			<div class="flex min-w-fit items-center gap-8">
				<span>Locked by {lockUser?.username ?? 'Unknown'}</span>

				<div class="tooltip" data-tip="Discard changes">
					<label for={modalId} class="btn btn-ghost btn-sm icon-btn modal-button">
						<span class="icon icon-[fa-solid--undo-alt]"></span>
					</label>
				</div>
				<input type="checkbox" id={modalId} class="modal-toggle" />
				<label for={modalId} class="modal modal-bottom sm:modal-middle cursor-pointer">
					<label class="modal-box relative" for="">
						<h3 class="text-lg font-bold">Discard changes</h3>
						<p class="py-4">Are you sure you want to discard any unsaved changes?</p>
						<div class="modal-action">
							<label for={modalId} class="btn btn-neutral" onclick={unlock} onkeypress={unlock}
								>Yes</label
							>
							<label for={modalId} class="btn btn-neutral">No</label>
						</div>
					</label>
				</label>

				<div class="tooltip" data-tip="Save">
					<button type="submit" class="btn btn-ghost btn-sm icon-btn" aria-label="Save" title="Save"
						><span class="icon icon-[fa-solid--save]"></span></button
					>
				</div>
			</div>
		</div>
		<hr class="mb-8" />

		<div class="flex flex-col gap-16 sm:flex-row">
			<div class="flex flex-2 flex-col gap-2">
				<h2 class="my-4 text-xl font-bold">Details</h2>

				<fieldset class="fieldset">
					<label class="label" for="title-input">Title</label>
					<input type="text" id="title-input" name="title" value={title} required class="input" />
				</fieldset>

				<fieldset class="fieldset">
					<label class="label" for="game-date">Game Date</label>
					<input
						type="text"
						id="game-date"
						name="gameDate"
						value={gameDate?.toISOString().substring(0, 10) ?? ''}
						required
						class="input"
					/>
				</fieldset>

				<fieldset class="fieldset">
					<label class="label" for="brief">Brief</label>
					<TextAreaAutoGrow
						id="brief"
						name="brief"
						class="textarea w-full"
						bind:value={brief}
						required
					/>
				</fieldset>

				<fieldset class="fieldset">
					<label class="label" for="brief">Synopsis</label>
					<TextAreaAutoGrow
						id="synopsis"
						name="synopsis"
						class="textarea h-auto w-full"
						rows={6}
						bind:value={synopsis}
						required
					/>
				</fieldset>

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
					{#each aiSuggestions.titles as suggestedTitle, i (i + suggestedTitle)}
						<div>{suggestedTitle}</div>
						<button
							type="button"
							onclick={() => (title = suggestedTitle ?? null)}
							class="link text-accent no-underline hover:underline">Use</button
						>
					{/each}
				</div>
				<div class="mb-4">
					<div class="text-lg font-bold">Briefs</div>
					{#each aiSuggestions.briefs as suggestedBrief, i (i + suggestedBrief)}
						<div>{suggestedBrief}</div>
						<button
							type="button"
							onclick={() => (brief = suggestedBrief ?? null)}
							class="link text-accent no-underline hover:underline">Use</button
						>
					{/each}
				</div>
				<div class="mb-4">
					<div class="text-lg font-bold">Synopses</div>
					{#each aiSuggestions.synopses as suggestedSynopsis, i (i + suggestedSynopsis)}
						<div>{suggestedSynopsis}</div>
						<button
							type="button"
							onclick={() => (synopsis = suggestedSynopsis ?? null)}
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
								onclick={() => artifactIds.add(foundArtifact.id)}>&plus;</button
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
								onclick={() => associationIds.add(foundAssociation.id)}>&plus;</button
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
								onclick={() => characterIds.add(foundCharacter.id)}>&plus;</button
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
								onclick={() => itemIds.add(foundItem.id)}>&plus;</button
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
								onclick={() => placeIds.add(foundPlace.id)}>&plus;</button
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
								onclick={() => raceIds.add(foundRace.id)}>&plus;</button
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
				onclick={() => aiLogSuggestions.fetch({ variables: { id: pk } })}
				aria-label="Load Ai Suggestions"
				title="Load Ai Suggestions"
			>
				<span class="icon icon-[fa-solid--robot]"></span>
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
			<span class="icon icon-[fa-solid--robot]"></span>
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
