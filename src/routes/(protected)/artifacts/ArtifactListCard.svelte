<script lang="ts">
	import { fromGlobalId } from 'graphql-relay';
	import { fragment, graphql, type ArtifactListCardFields } from '$houdini';
	import ItemTypeIcons from '$lib/components/ItemTypeIcons.svelte';
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';

	export let artifact: ArtifactListCardFields;

	$: data = fragment(
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
	);

	$: ({ id, name, items } = $data);

	$: globalId = fromGlobalId(id).id;
	$: href = `artifacts/${globalId}`;
	$: itemNodes = items.edges?.map((edge) => edge.node) || [];
	$: isWeapon = itemNodes.some((item) => !!item.weapon);
	$: isArmor = itemNodes.some((item) => !!item.armor);
	$: isEquipment = itemNodes.some((item) => !!item.equipment);
</script>

<ListDetailCard entity={$data} {href}>
	<svelte:fragment slot="title">
		<a {href}>{name}</a>
		<ItemTypeIcons {isWeapon} {isArmor} {isEquipment} />
	</svelte:fragment>
</ListDetailCard>
