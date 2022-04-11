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

{#if status === 'LOADED' && value}
	<slot />
{:else if status === 'LOADED' && !value}
	<NotFound {entityName} />
{:else if status === 'LOADING'}
	<Loading />
{:else if status === 'ERROR'}
	<Error {errors} />
{:else}
	<SomethingWentWrong />
{/if}
