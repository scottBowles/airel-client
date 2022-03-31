<script>
	import '@kahi-ui/framework/dist/kahi-ui.framework.min.css';
	import '@kahi-ui/framework/dist/kahi-ui.theme.default.min.css';

	import NavBar from '$lib/components/NavBar.svelte';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { post } from '$lib/utils';

	async function logout() {
		await post('/endpoints/logout');
		$session.token = null;
		goto('/login');
		console.log('logged out');
	}
</script>

<div>
	<NavBar />
	<h1>session token : {$session.token}</h1>
	{#if $session.token}
		<h1>You are logged in</h1>
		<button on:click={logout}>Log Out</button>
	{:else}
		<h1>You are not logged in</h1>
	{/if}
	<slot />
</div>

<style>
	div {
		background-color: #f5f5f5;
		min-height: 100vh;
		width: 100vw;
	}
</style>
