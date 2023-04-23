<script lang="ts">
	import Spacer from '$lib/components/Spacer.svelte';

	// instead of typing this I probably should just use a fragment here
	export let equipment: { briefDescription: string };
</script>

<h3 class="text-xl font-bold">Equipment</h3>
<Spacer xs />
<p>{equipment?.briefDescription}</p>
