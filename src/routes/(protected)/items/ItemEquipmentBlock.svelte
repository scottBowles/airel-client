<svelte:options runes={true} />

<script lang="ts">
	import { fragment, graphql, type ItemEquipmentBlock } from '$houdini';
	import Spacer from '$lib/components/Spacer.svelte';

	let { item }: { item: ItemEquipmentBlock } = $props();

	let data = $derived(
		fragment(
			item,
			graphql(`
				fragment ItemEquipmentBlock on Item {
					equipment {
						briefDescription
					}
				}
			`)
		)
	);

	let { equipment } = $derived($data);
</script>

<h3 class="text-xl font-bold">Equipment</h3>
<Spacer xs />
<p>{equipment?.briefDescription}</p>
