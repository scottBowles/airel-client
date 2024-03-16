<script lang="ts">
	import type { QueryResult } from '$houdini';
	import Error from './Error.svelte';
	import Loading from './Loading.svelte';
	import NotFound from './NotFound.svelte';
	import SomethingWentWrong from './SomethingWentWrong.svelte';

	export let entityName: string;
	export let queryResult: QueryResult<unknown, unknown>;

	$: ({ data, errors, fetching } = queryResult);
</script>

{#if fetching}
	<Loading />
{:else if errors && errors?.length > 0}
	<Error {errors} />
{:else if data === undefined}
	<SomethingWentWrong />
{:else if data === null}
	<NotFound {entityName} />
{:else}
	<slot />
{/if}
