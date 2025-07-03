<svelte:options runes={true} />

<script lang="ts">
	import { fragment, graphql } from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import type { PageData } from './$houdini';
	import ItemDetail from './ItemDetail.svelte';
	import ItemEdit from './ItemEdit.svelte';

	let { data }: { data: PageData } = $props();

	let { Item } = $derived(data);
	let item = $derived($Item.data?.item);

	let lockedBySelfData = $derived(
		fragment(
			item,
			graphql(`
				fragment ItemLockedBySelf on Item {
					id
					lockedBySelf
				}
			`)
		)
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
