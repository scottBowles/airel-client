<script lang="ts">
	import { fragment, graphql } from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import type { PageData } from './$houdini';
	import ItemDetail from './ItemDetail.svelte';
	import ItemEdit from './ItemEdit.svelte';

	export let data: PageData;

	$: ({ Item } = data);
	$: item = $Item.data?.item;

	$: lockedBySelf = fragment(
		item,
		graphql(`
			fragment ItemLockedBySelf on Item {
				lockedBySelf
			}
		`)
	);
</script>

<StatusHandler creating="false" status="DONE" errors={''} value={item} entityName="item">
	{#if !item}
		<Loading />
	{:else if $lockedBySelf?.lockedBySelf}
		<ItemEdit {item} />
	{:else}
		<ItemDetail {item} />
	{/if}
</StatusHandler>
