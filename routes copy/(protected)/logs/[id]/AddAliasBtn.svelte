<script lang="ts">
	import MultiSelect, { type Option } from 'svelte-multiselect';
	import FaUsers from 'svelte-icons/fa/FaUsers.svelte';
	import type { EntityType } from '$lib/constants';
	import {
		ArtifactNamesAndIdsStore,
		AssociationNamesAndIdsStore,
		CharacterNamesAndIdsStore,
		EntityAddAliasStore,
		ItemNamesAndIdsStore,
		PlaceNamesIdsAndTypesStore,
		RaceNamesAndIdsStore
	} from '$houdini';
	import { browser } from '$app/environment';
	import { fromGlobalId, somethingWentWrong } from '$lib/utils';

	const entityAddAliasMutation = new EntityAddAliasStore();

	const artifactNamesAndIdsQuery = new ArtifactNamesAndIdsStore();
	const associationNamesAndIdsQuery = new AssociationNamesAndIdsStore();
	const characterNamesAndIdsQuery = new CharacterNamesAndIdsStore();
	const itemNamesAndIdsQuery = new ItemNamesAndIdsStore();
	const placeNamesIdsAndTypesQuery = new PlaceNamesIdsAndTypesStore();
	const raceNamesAndIdsQuery = new RaceNamesAndIdsStore();
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
		.map((node) => ({ label: node.name, value: node.id }));

	export let entityName: string;
	export let suggestedEntityType: EntityType | undefined = undefined;
	export let updateFoundEntities: (type: EntityType, newEntity: any) => void;
	export let verbose = false;

	let entitySelected: Option[];
	let isOpen: boolean;

	const ALIAS_MODAL_ID = 'modal-alias-entity' + suggestedEntityType + entityName;

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
</script>

<label for={ALIAS_MODAL_ID} class="link hover:accent modal-button">
	<div class="icon"><FaUsers /></div>
	{#if verbose} Add Any Alias{/if}
</label>

<input type="checkbox" id={ALIAS_MODAL_ID} class="modal-toggle" bind:checked={isOpen} />
<label for={ALIAS_MODAL_ID} class="modal modal-bottom sm:modal-middle cursor-pointer">
	<label class="modal-box relative" for="">
		<form on:submit|preventDefault={handleAddAlias}>
			<h3 class="font-bold text-lg">Add as Alias</h3>

			<div class="form-control w-full max-w-xs">
				<label class="label" for={'entity-select'}>
					<span class="label-text">Select Entity</span>
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

			<div class="form-control">
				<label for="alias" class="label"><span class="label-text">Alias</span></label>
				<input name="alias" id="alias" class="input input-bordered" value={entityName} required />
			</div>

			<div class="modal-action">
				<button type="submit" class="btn btn-ghost btn-sm btn-custom ml-auto">Add Alias</button>
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
