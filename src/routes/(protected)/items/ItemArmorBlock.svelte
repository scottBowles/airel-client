<svelte:options runes={true} />

<script lang="ts">
	import { fragment, graphql, type ItemArmorBlock } from '$houdini';
	import Spacer from '$lib/components/Spacer.svelte';

	let { item } = $props<{ item: ItemArmorBlock }>();

	let data = $derived(
		fragment(
			item,
			graphql(`
				fragment ItemArmorBlock on Item {
					armor {
						acBonus
					}
				}
			`)
		)
	);

	let { armor } = $derived($data);
</script>

<h3 class="text-xl font-bold">Armor</h3>
<Spacer xs />
<p>AC Bonus: {armor?.acBonus}</p>
