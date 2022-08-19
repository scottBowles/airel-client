<script>
	import Spacer from '$lib/components/Spacer.svelte';

	export let equipment;
</script>

<h3 class="text-xl font-bold">Equipment</h3>
<Spacer xs />
<p>{equipment?.briefDescription}</p>
