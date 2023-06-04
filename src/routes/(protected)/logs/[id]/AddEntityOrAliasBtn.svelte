<script lang="ts">
	import MultiSelect, { type Option } from 'svelte-multiselect';
	import FaUserPlus from 'svelte-icons/fa/FaUserPlus.svelte';
	import { ENTITY_TYPE, ENTITY_TYPES, type EntityType } from '$lib/constants';
	import {
		ArtifactNamesAndIdsStore,
		AssociationNamesAndIdsStore,
		CharacterNamesAndIdsStore,
		CreateArtifactStore,
		CreateAssociationStore,
		CreateCharacterStore,
		CreateItemStore,
		CreatePlaceStore,
		CreateRaceStore,
		EntityAddAliasStore,
		ItemNamesAndIdsStore,
		PlaceNamesIdsAndTypesStore,
		RaceNamesAndIdsStore
	} from '$houdini';
	import { browser } from '$app/environment';
	import { capitalize, fromGlobalId, somethingWentWrong } from '$lib/utils';
	import { pick } from 'ramda';
	import FaInfoCircle from 'svelte-icons/fa/FaInfoCircle.svelte';

	const entityAddAliasMutation = new EntityAddAliasStore();

	$: {
		if (browser) {
			artifactNamesAndIdsQuery.fetch();
			associationNamesAndIdsQuery.fetch();
			characterNamesAndIdsQuery.fetch();
			itemNamesAndIdsQuery.fetch();
			placeNamesIdsAndTypesQuery.fetch();
			raceNamesAndIdsQuery.fetch();
		}
	}

	$: allEntityOptions = [
		$artifactNamesAndIdsQuery.data?.artifacts.edges.map((edge) => edge.node),
		$associationNamesAndIdsQuery.data?.associations.edges.map((edge) => edge.node),
		$characterNamesAndIdsQuery.data?.characters.edges.map((edge) => edge.node),
		$itemNamesAndIdsQuery.data?.items.edges.map((edge) => edge.node),
		$placeNamesIdsAndTypesQuery.data?.places.edges.map((edge) => edge.node),
		$raceNamesAndIdsQuery.data?.races.edges.map((edge) => edge.node)
	]
		.filter(Boolean)
		.flat()
		.map((node) => ({ label: `${node.name} (${node.__typename})`, value: node.id }));

	export let entityName: string;
	export let suggestedEntityType: EntityType | undefined = undefined;
	export let updateFoundEntities: (type: EntityType, newEntity: any) => void;
	export let updateLogEntitiesInForm: (id: string) => void;
	export let verbose = false;

	let entitySelected: Option[] = [];
	$: console.log({ entitySelected });
	let isOpen: boolean;

	const MODAL_ID = 'modal-add-or-alias-entity' + suggestedEntityType + entityName;

	async function handleAddAlias(event: Event) {
		const data = new FormData(event.target as HTMLFormElement);
		const id = data.get('entity')?.toString();
		const alias = data.get('alias')?.toString();
		if (!id || !alias) {
			console.log('handleAddAlias: missing id or alias', { id, alias });
			return;
		}
		const res = await entityAddAliasMutation.mutate({ id, alias });
		if (res.errors) return somethingWentWrong(res.errors?.[0]?.message);
		const entityIdInfo = fromGlobalId(id);
		if (res.data?.entityAddAlias?.__typename !== "non-exhaustive; don't match this") {
			updateFoundEntities(entityIdInfo.type as EntityType, {
				id: res.data?.entityAddAlias.id,
				name: res.data?.entityAddAlias.name,
				aliases: res.data?.entityAddAlias.aliases
			});
		}
		isOpen = false;
	}

	const createArtifactMutation = new CreateArtifactStore();
	const createAssociationMutation = new CreateAssociationStore();
	const createCharacterMutation = new CreateCharacterStore();
	const createItemMutation = new CreateItemStore();
	const createPlaceMutation = new CreatePlaceStore();
	const createRaceMutation = new CreateRaceStore();

	const artifactNamesAndIdsQuery = new ArtifactNamesAndIdsStore();
	const associationNamesAndIdsQuery = new AssociationNamesAndIdsStore();
	const characterNamesAndIdsQuery = new CharacterNamesAndIdsStore();
	const itemNamesAndIdsQuery = new ItemNamesAndIdsStore();
	const placeNamesIdsAndTypesQuery = new PlaceNamesIdsAndTypesStore();
	const raceNamesAndIdsQuery = new RaceNamesAndIdsStore();

	const createArtifact = async ({ name }: { name: string }) => {
		const res = await createArtifactMutation.mutate({ name });
		if (res.data?.createArtifact.__typename === 'Artifact') {
			return pick(['id', 'name'], res.data.createArtifact);
		}
	};

	const createAssociation = async ({ name }: { name: string }) => {
		const res = await createAssociationMutation.mutate({ name });
		if (res.data?.createAssociation.__typename === 'Association') {
			return pick(['id', 'name'], res.data.createAssociation);
		}
	};

	const createCharacter = async ({ name }: { name: string }) => {
		const res = await createCharacterMutation.mutate({ name });
		if (res.data?.createCharacter.__typename === 'Character') {
			return pick(['id', 'name'], res.data.createCharacter);
		}
	};

	const createItem = async ({ name }: { name: string }) => {
		const res = await createItemMutation.mutate({ name });
		if (res.data?.createItem.__typename === 'Item') {
			return pick(['id', 'name'], res.data.createItem);
		}
	};

	const createPlace = async ({ name }: { name: string }) => {
		const res = await createPlaceMutation.mutate({ name });
		if (res.data?.createPlace.__typename === 'Place') {
			return pick(['id', 'name'], res.data.createPlace);
		}
	};

	const createRace = async ({ name }: { name: string }) => {
		const res = await createRaceMutation.mutate({ name });
		if (res.data?.createRace.__typename === 'Race') {
			return pick(['id', 'name'], res.data.createRace);
		}
	};

	async function handleAddEntity(event: Event) {
		const data = new FormData(event.target as HTMLFormElement);
		const name = data.get('name')?.toString();
		const entityType = data.get('entityType')?.toString();

		if (!name) return somethingWentWrong('No name provided');
		if (!entityType) return somethingWentWrong('No entityType provided');

		const mutation = {
			[ENTITY_TYPE.ARTIFACT]: createArtifact,
			[ENTITY_TYPE.ASSOCIATION]: createAssociation,
			[ENTITY_TYPE.CHARACTER]: createCharacter,
			[ENTITY_TYPE.ITEM]: createItem,
			[ENTITY_TYPE.PLACE]: createPlace,
			[ENTITY_TYPE.RACE]: createRace
		}[entityType];
		const formSelectQuery = {
			[ENTITY_TYPE.ARTIFACT]: artifactNamesAndIdsQuery,
			[ENTITY_TYPE.ASSOCIATION]: associationNamesAndIdsQuery,
			[ENTITY_TYPE.CHARACTER]: characterNamesAndIdsQuery,
			[ENTITY_TYPE.ITEM]: itemNamesAndIdsQuery,
			[ENTITY_TYPE.PLACE]: placeNamesIdsAndTypesQuery,
			[ENTITY_TYPE.RACE]: raceNamesAndIdsQuery
		}[entityType];

		if (!mutation || !formSelectQuery)
			return somethingWentWrong('No mutation found for entityType: ' + entityType);

		const newEntity = await mutation({ name });
		if (!newEntity) return somethingWentWrong('No new entity returned from mutation');

		const newEntityType = fromGlobalId(newEntity.id).type as EntityType;
		const newData = pick(['id', 'name'], newEntity);
		updateFoundEntities(newEntityType, newData);
		updateLogEntitiesInForm(newEntity.id);
		(formSelectQuery.fetch as any)({ policy: 'NetworkOnly' });
		isOpen = false;
	}

	$: handleSubmit = entitySelected.length === 0 ? handleAddEntity : handleAddAlias;
</script>

<label for={MODAL_ID} class="link no-underline hover:accent modal-button">
	<div class="tooltip" data-tip="Add a new entity for this log or alias an existing.">
		<div class="icon"><FaUserPlus /></div>
		{#if verbose}<span class="underline"> Add or Alias any Entity</span>{/if}
	</div>
</label>

<input type="checkbox" id={MODAL_ID} class="modal-toggle" bind:checked={isOpen} />
<label for={MODAL_ID} class="modal modal-bottom sm:modal-middle cursor-pointer">
	<label class="modal-box relative" for="">
		<form on:submit|preventDefault={handleSubmit}>
			<h3 class="font-bold text-lg">Add Entity</h3>

			<div class="form-control w-full max-w-xs">
				<label class="label" for={'entity-select'}>
					<span class="label-text"
						>Check if Entity Exists? (Optional)
						<div
							class="tooltip tooltip-bottom"
							data-tip="If you're not sure whether this entity exists, it's always good to check first. If it does, you'll have the option to add an alias. Otherwise, feel free to skip this and just add below."
						>
							<span class="icon"><FaInfoCircle /></span>
						</div></span
					>
				</label>
				<MultiSelect
					id="entity-select"
					name="entity-select"
					maxSelect={1}
					options={allEntityOptions}
					loading={allEntityOptions.length === 0}
					bind:selected={entitySelected}
				/>
				<input type="hidden" name="entity" value={entitySelected?.[0]?.value} />
			</div>

			{#if entitySelected.length > 0}
				<div class="form-control">
					<label for="alias" class="label"><span class="label-text">Alias</span></label>
					<input name="alias" id="alias" class="input input-bordered" value={entityName} required />
				</div>

				<div class="modal-action">
					<button type="submit" class="btn btn-ghost btn-sm btn-custom ml-auto">Add Alias</button>
				</div>
			{:else}
				<div class="form-control w-full max-w-xs">
					<label class="label" for={'entity-type'}>
						<span class="label-text">Select Entity Type</span>
					</label>
					<select class="select select-bordered" id={'entity-type'} name="entityType">
						{#each ENTITY_TYPES as opt}
							<option value={opt} selected={suggestedEntityType === opt}>{capitalize(opt)}</option>
						{/each}
					</select>
				</div>

				<div class="form-control">
					<label for="name" class="label"><span class="label-text">Name</span></label>
					<input name="name" id="name" class="input input-bordered" value={entityName} required />
				</div>

				<div class="modal-action">
					<button type="submit" class="btn btn-ghost btn-sm btn-custom ml-auto">Add Entity</button>
				</div>
			{/if}
		</form>
	</label>
</label>

<style>
	.icon {
		display: inline-block;
		height: 16px;
		width: 16px;
	}
</style>
