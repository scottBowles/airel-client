<script lang="ts">
	import { fragment, graphql } from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import type { PageData } from './$houdini';
	import PlaceDetail from './PlaceDetail.svelte';
	import PlaceEdit from './PlaceEdit.svelte';

	export let data: PageData;

	$: ({ Place } = data);
	$: place = $Place.data?.place;

	$: lockedBySelf = fragment(
		place,
		graphql(`
			fragment PlaceLockedBySelf on Place {
				lockedBySelf
			}
		`)
	);
</script>

<StatusHandler creating="false" status="DONE" errors={''} value={place} entityName="place">
	{#if !place}
		<Loading />
	{:else if $lockedBySelf?.lockedBySelf}
		<PlaceEdit {place} />
	{:else}
		<PlaceDetail {place} />
	{/if}
</StatusHandler>
