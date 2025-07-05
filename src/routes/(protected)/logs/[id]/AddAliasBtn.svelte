<script lang="ts">
	import {
		ArtifactNamesAndIdsStore,
		AssociationNamesAndIdsStore,
		CharacterNamesAndIdsStore,
		EntityAddAliasStore,
		ItemNamesAndIdsStore,
		PlaceNamesIdsAndTypesStore,
		RaceNamesAndIdsStore
	} from '$houdini';
	import type { EntityType } from '$lib/constants';
	import { fromGlobalId, somethingWentWrong } from '$lib/utils';
	import { onMount } from 'svelte';
	import MultiSelect from 'svelte-multiselect';

	const entityAddAliasMutation = new EntityAddAliasStore();

	const artifactNamesAndIdsQuery = new ArtifactNamesAndIdsStore();
	const associationNamesAndIdsQuery = new AssociationNamesAndIdsStore();
	const characterNamesAndIdsQuery = new CharacterNamesAndIdsStore();
	const itemNamesAndIdsQuery = new ItemNamesAndIdsStore();
	const placeNamesIdsAndTypesQuery = new PlaceNamesIdsAndTypesStore();
	const raceNamesAndIdsQuery = new RaceNamesAndIdsStore();
	onMount(() => {
		artifactNamesAndIdsQuery.fetch();
		associationNamesAndIdsQuery.fetch();
		characterNamesAndIdsQuery.fetch();
		itemNamesAndIdsQuery.fetch();
		placeNamesIdsAndTypesQuery.fetch();
		raceNamesAndIdsQuery.fetch();
	});

	let allEntityOptions = $derived(
		[
			$artifactNamesAndIdsQuery.data?.artifacts.edges.map((edge) => edge.node),
			$associationNamesAndIdsQuery.data?.associations.edges.map((edge) => edge.node),
			$characterNamesAndIdsQuery.data?.characters.edges.map((edge) => edge.node),
			$itemNamesAndIdsQuery.data?.items.edges.map((edge) => edge.node),
			$placeNamesIdsAndTypesQuery.data?.places.edges.map((edge) => edge.node),
			$raceNamesAndIdsQuery.data?.races.edges.map((edge) => edge.node)
		]
			.filter(Boolean)
			.flat()
			.map((node) => ({ label: node.name, value: node.id }))
	);

	interface Props {
		entityName: string;
		suggestedEntityType?: EntityType | undefined;
		updateFoundEntities: (type: EntityType, newEntity: any) => void;
		verbose?: boolean;
	}

	let {
		entityName,
		suggestedEntityType = undefined,
		updateFoundEntities,
		verbose = false
	}: Props = $props();

	let entitySelected: typeof allEntityOptions | undefined = $state();
	let isOpen: boolean = $state(false);

	const ALIAS_MODAL_ID = 'modal-alias-entity' + suggestedEntityType + entityName;

	async function handleAddAlias(event: Event) {
		event.preventDefault();
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
	<div class="icon icon-[fa-solid--users]"></div>
	{#if verbose}
		Add Any Alias{/if}
</label>

<input type="checkbox" id={ALIAS_MODAL_ID} class="modal-toggle" bind:checked={isOpen} />
<label for={ALIAS_MODAL_ID} class="modal modal-bottom sm:modal-middle cursor-pointer">
	<label class="modal-box relative" for="">
		<form onsubmit={handleAddAlias}>
			<h3 class="text-lg font-bold">Add as Alias</h3>

			<fieldset class="fieldset w-full max-w-xs">
				<label class="label" for="entity-select">Select Entity</label>
				<MultiSelect
					id="entity-select"
					name="entity-select"
					maxSelect={1}
					options={allEntityOptions}
					loading={allEntityOptions.length === 0}
					bind:selected={entitySelected}
					outerDivClass="select"
				/>
				<input type="hidden" name="entity" value={entitySelected?.[0]?.value} />
			</fieldset>

			<fieldset class="fieldset">
				<label for="alias" class="label">Alias</label>
				<input name="alias" id="alias" class="input" value={entityName} required />
			</fieldset>

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
