<svelte:options runes={true} />

<script lang="ts">
	import { fromGlobalId } from '$lib/utils';
	import { fragment, graphql, type ArtifactListCardFields } from '$houdini';
	import ItemTypeIcons from '$lib/components/ItemTypeIcons.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';

	let { artifact }: { artifact: ArtifactListCardFields } = $props();

	let data = $derived(
		fragment(
			artifact,
			graphql(`
				fragment ArtifactListCardFields on Artifact {
					id
					name
					items {
						edges {
							node {
								armor {
									acBonus
								}
								weapon {
									attackBonus
								}
								equipment {
									briefDescription
								}
							}
						}
					}
					...EntityListFields
				}
			`)
		)
	);

	let { id, name, items } = $derived($data);

	let globalId = $derived(fromGlobalId(id).id);
	let href = $derived(`artifacts/${globalId}`);
	let itemNodes = $derived(items.edges?.map((edge) => edge.node) || []);
	let isWeapon = $derived(itemNodes.some((item) => !!item.weapon));
	let isArmor = $derived(itemNodes.some((item) => !!item.armor));
	let isEquipment = $derived(itemNodes.some((item) => !!item.equipment));
</script>

<ListDetailCard entity={$data} {href}>
	<svelte:fragment slot="title">
		<a {href}>{name}</a>
		<ItemTypeIcons {isWeapon} {isArmor} {isEquipment} />
	</svelte:fragment>
</ListDetailCard>
