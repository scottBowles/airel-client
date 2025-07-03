<script lang="ts">
	import type { QueryResult } from '$houdini';
	import type { Snippet } from 'svelte';
	import Error from './Error.svelte';
	import Loading from './Loading.svelte';
	import NotFound from './NotFound.svelte';
	import SomethingWentWrong from './SomethingWentWrong.svelte';

	interface Props {
		entityName: string;
		queryResult: QueryResult<unknown, unknown>;
		children?: Snippet;
	}

	let { entityName, queryResult, children }: Props = $props();

	let { data, errors, fetching } = $derived(queryResult);
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
	{@render children?.()}
{/if}
