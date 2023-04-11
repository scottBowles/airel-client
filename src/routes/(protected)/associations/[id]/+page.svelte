<script lang="ts">
	import { fragment, graphql } from '$houdini';
	import { Loading, StatusHandler } from '$lib/components/DetailPage';
	import type { PageData } from './$houdini';
	import AssociationDetail from './AssociationDetail.svelte';
	import AssociationEdit from './AssociationEdit.svelte';

	export let data: PageData;

	$: ({ Association } = data);
	$: association = $Association.data?.association;

	$: lockedBySelf = fragment(
		association,
		graphql(`
			fragment AssociationLockedBySelf on Association {
				lockedBySelf
			}
		`)
	);
</script>

<StatusHandler
	creating="false"
	status="DONE"
	errors={''}
	value={association}
	entityName="association"
>
	{#if !association}
		<Loading />
	{:else if $lockedBySelf?.lockedBySelf}
		<AssociationEdit {association} />
	{:else}
		<AssociationDetail {association} />
	{/if}
</StatusHandler>
