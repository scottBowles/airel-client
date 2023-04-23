<script lang="ts">
	import { fragment, graphql, type ItemWeaponBlock } from '$houdini';
	import Spacer from '$lib/components/Spacer.svelte';

	export let item: ItemWeaponBlock;

	$: data = fragment(
		item,
		graphql(`
			fragment ItemWeaponBlock on Item {
				weapon {
					attackBonus
				}
			}
		`)
	);

	$: ({ weapon } = $data);
</script>

<h3 class="text-xl font-bold">Weapon</h3>
<Spacer xs />
<p>Attack Bonus: {weapon?.attackBonus}</p>
