<svelte:options runes={true} />

<script lang="ts">
	import { fragment, graphql, type ItemWeaponBlock } from '$houdini';
	import Spacer from '$lib/components/Spacer.svelte';

	let { item }: { item: ItemWeaponBlock } = $props();

	let data = $derived(
		fragment(
			item,
			graphql(`
				fragment ItemWeaponBlock on Item {
					weapon {
						attackBonus
					}
				}
			`)
		)
	);

	let { weapon } = $derived($data);
</script>

<h3 class="text-xl font-bold">Weapon</h3>
<Spacer xs />
<p>Attack Bonus: {weapon?.attackBonus}</p>
