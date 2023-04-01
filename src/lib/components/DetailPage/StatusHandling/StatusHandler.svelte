<script lang="ts">
	import Error from './Error.svelte';
	import Loading from './Loading.svelte';
	import NotFound from './NotFound.svelte';
	import SomethingWentWrong from './SomethingWentWrong.svelte';

	export let status: any;
	export let entityName: any;
	export let errors: any;
	export let value: any;
	export let creating: any;
</script>

{#if creating}
	<slot />
{:else if status === undefined}
	<Loading />
{:else if ['LOADING', 'NEVER'].includes(status)}
	<slot />
{:else if status === 'DONE' && errors?.length > 0}
	<Error {errors} />
{:else if (status === 'DONE' && value) || status === undefined}
	<slot />
{:else if status === 'DONE' && !value}
	<NotFound {entityName} />
{:else}
	<SomethingWentWrong />
{/if}
