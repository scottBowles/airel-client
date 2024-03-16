<script lang="ts">
	import { fragment, graphql, type ItemEquipmentBlock } from '$houdini';
	import Spacer from '$lib/components/Spacer.svelte';

	export let item: ItemEquipmentBlock;

	$: data = fragment(
		item,
		graphql(`
			fragment ItemEquipmentBlock on Item {
				equipment {
					briefDescription
				}
			}
		`)
	);

	$: ({ equipment } = $data);
</script>

<h3 class="text-xl font-bold">Equipment</h3>
<Spacer xs />
<p>{equipment?.briefDescription}</p>
