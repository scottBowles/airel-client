<script lang="ts">
	import { fragment, graphql, type ItemArmorBlock } from '$houdini';
	import Spacer from '$lib/components/Spacer.svelte';

	export let item: ItemArmorBlock;

	$: data = fragment(
		item,
		graphql(`
			fragment ItemArmorBlock on Item {
				armor {
					acBonus
				}
			}
		`)
	);

	$: ({ armor } = $data);
</script>

<h3 class="text-xl font-bold">Armor</h3>
<Spacer xs />
<p>AC Bonus: {armor?.acBonus}</p>
