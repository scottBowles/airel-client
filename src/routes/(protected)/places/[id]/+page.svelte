<script lang="ts">
	import { fragment, graphql } from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import type { PageData } from './$houdini';
	import PlaceDetail from './PlaceDetail.svelte';
	import PlaceEdit from './PlaceEdit.svelte';

	export let data: PageData;

	$: ({ Place } = data);
	$: place = $Place.data?.place;

	$: lockedBySelfData = fragment(
		place,
		graphql(`
			fragment PlaceLockedBySelf on Place {
				id
				lockedBySelf
			}
		`)
	);
</script>

<StatusHandler entityName="place" queryResult={$Place}>
	{#if !place}
		<Loading />
	{:else if $lockedBySelfData?.lockedBySelf}
		<PlaceEdit {place} />
	{:else}
		<PlaceDetail {place} />
	{/if}
</StatusHandler>
