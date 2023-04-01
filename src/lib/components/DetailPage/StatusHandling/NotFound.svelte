<script>
	import { BasicProperty, Layout } from '$lib/components/DetailPage';
	import { capitalize } from '$lib/utils';
	export let entityName;
</script>

<Layout name="{capitalize(entityName)} Not Found">
	<BasicProperty
		name=""
		value="We couldn't find that {entityName}. How'd you get here anyway? Are you trying weird things with the url? Or maybe they were deleted! The poor thing. In any event, maybe go back to the {entityName}s page or your home page and try again."
		slot="properties"
	/>
</Layout>
