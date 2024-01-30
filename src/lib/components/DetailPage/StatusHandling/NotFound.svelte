<svelte:options runes={true} />

<script lang="ts">
	import { BasicProperty, LayoutBase } from '$lib/components/DetailPage';
	import { capitalize } from '$lib/utils';

	let { entityName } = $props<{ entityName: string }>();
</script>

<LayoutBase>
	<!-- NAME -->
	<h1 slot="name" class="text-3xl font-bold">{capitalize(entityName)} Not Found</h1>

	<BasicProperty
		name=""
		value="We couldn't find that {entityName}. How'd you get here anyway? Are you trying weird things with the url? Or maybe they were deleted! The poor thing. In any event, maybe go back to the {entityName}s page or your home page and try again."
		slot="properties"
	/>
</LayoutBase>
