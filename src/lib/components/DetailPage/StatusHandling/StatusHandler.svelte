<script>
	import Error from './Error.svelte';
	import Loading from './Loading.svelte';
	import NotFound from './NotFound.svelte';
	import SomethingWentWrong from './SomethingWentWrong.svelte';

	export let status;
	export let entityName;
	export let errors;
	export let value;
</script>

{#if status === 'LOADING'}
	<Loading />
{:else if status === 'DONE' && errors?.length > 0}
	<Error {errors} />
{:else if status === 'DONE' && value}
	<slot />
{:else if status === 'DONE' && !value}
	<NotFound {entityName} />
{:else}
	<SomethingWentWrong />
{/if}
