<script lang="ts">
	import { fragment, graphql } from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import type { PageData } from './$houdini';
	import AssociationDetail from './AssociationDetail.svelte';
	import AssociationEdit from './AssociationEdit.svelte';

	export let data: PageData;

	$: ({ Association } = data);
	$: association = $Association.data?.association;

	$: lockedBySelfData = fragment(
		association,
		graphql(`
			fragment AssociationLockedBySelf on Association {
				id
				lockedBySelf
			}
		`)
	);
</script>

<StatusHandler entityName="association" queryResult={$Association}>
	{#if !association}
		<Loading />
	{:else if $lockedBySelfData?.lockedBySelf}
		<AssociationEdit {association} />
	{:else}
		<AssociationDetail {association} />
	{/if}
</StatusHandler>
