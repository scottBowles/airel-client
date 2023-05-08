<script lang="ts">
	import { fragment, graphql } from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import type { PageData } from './$houdini';
	import ItemDetail from './ItemDetail.svelte';
	import ItemEdit from './ItemEdit.svelte';

	export let data: PageData;

	$: ({ Item } = data);
	$: item = $Item.data?.item;

	$: lockedBySelfData = fragment(
		item,
		graphql(`
			fragment ItemLockedBySelf on Item {
				id
				lockedBySelf
			}
		`)
	);
</script>

<StatusHandler entityName="item" queryResult={$Item}>
	{#if !item}
		<Loading />
	{:else if $lockedBySelfData?.lockedBySelf}
		<ItemEdit {item} />
	{:else}
		<ItemDetail {item} />
	{/if}
</StatusHandler>
