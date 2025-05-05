<script lang="ts">
	import FaUserPlus from 'svelte-icons/fa/FaUserPlus.svelte';
	import { pick } from 'ramda';
	import { ENTITY_TYPE, ENTITY_TYPES, type EntityType } from '$lib/constants';
	import { capitalize, fromGlobalId, somethingWentWrong } from '$lib/utils';
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
		ItemNamesAndIdsStore,
		PlaceNamesIdsAndTypesStore,
		RaceNamesAndIdsStore
	} from '$houdini';

	const createArtifactMutation = new CreateArtifactStore();
	const createAssociationMutation = new CreateAssociationStore();
	const createCharacterMutation = new CreateCharacterStore();
	const createItemMutation = new CreateItemStore();
	const createPlaceMutation = new CreatePlaceStore();
	const createRaceMutation = new CreateRaceStore();

	interface Props {
		entityName: string;
		suggestedEntityType?: EntityType | undefined;
		updateFoundEntities: (type: EntityType, newEntity: any) => void;
		updateLogEntitiesInForm: (id: string) => void;
		verbose?: boolean;
	}

	let {
		entityName,
		suggestedEntityType = undefined,
		updateFoundEntities,
		updateLogEntitiesInForm,
		verbose = false
	}: Props = $props();

	const artifactNamesAndIdsQuery = new ArtifactNamesAndIdsStore();
	const associationNamesAndIdsQuery = new AssociationNamesAndIdsStore();
	const characterNamesAndIdsQuery = new CharacterNamesAndIdsStore();
	const itemNamesAndIdsQuery = new ItemNamesAndIdsStore();
	const placeNamesIdsAndTypesQuery = new PlaceNamesIdsAndTypesStore();
	const raceNamesAndIdsQuery = new RaceNamesAndIdsStore();

	let isOpen: boolean = $state(false);

	const ADD_MODAL_ID = 'modal-add-entity' + suggestedEntityType + entityName;

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
		event.preventDefault();
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
</script>

<label for={ADD_MODAL_ID} class="link hover:accent modal-button">
	<div class="icon"><FaUserPlus /></div>
	{#if verbose}
		Add Any Entity{/if}
</label>

<input type="checkbox" id={ADD_MODAL_ID} class="modal-toggle" bind:checked={isOpen} />
<label for={ADD_MODAL_ID} class="modal modal-bottom sm:modal-middle cursor-pointer">
	<label class="modal-box relative" for="">
		<form onsubmit={handleAddEntity}>
			<h3 class="text-lg font-bold">Add Entity</h3>

			<div class="form-control w-full max-w-xs">
				<label class="label" for="entity-type">
					<span class="label-text">Select Entity Type</span>
				</label>
				<select class="select" id="entity-type" name="entityType">
					{#each ENTITY_TYPES as opt (opt)}
						<option value={opt} selected={suggestedEntityType === opt}>{capitalize(opt)}</option>
					{/each}
				</select>
			</div>

			<div class="form-control">
				<label for="name" class="label"><span class="label-text">Name</span></label>
				<input name="name" id="name" class="input" value={entityName} required />
			</div>

			<div class="modal-action">
				<button type="submit" class="btn btn-ghost btn-sm btn-custom ml-auto">Add Entity</button>
			</div>
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
