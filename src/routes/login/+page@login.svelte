<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { post } from '$lib/utils';

	let username;
	let password;
	let errors = [];
	let token;
	let user;

	async function loginUser() {
		const response = await post(`endpoints/login`, { username, password });
		if (response.errors) {
			$session.token = null;
			$session.isLoggedIn = false;
			errors = response.errors.map((error) => error.message);
		} else {
			$session.token = response.tokenAuth.token;
			$session.isLoggedIn = true;
			goto('/');
		}
	}
</script>

<div class="container h-screen mx-auto flex flex-col items-center justify-center">
	<h1 class="text-3xl sm:text-4xl font-bold text-center mb-4">Welcome to Airel</h1>
	<form on:submit|preventDefault={loginUser} class="form-control w-full max-w-xs flex gap-2">
		<input
			type="text"
			name="username"
			placeholder="Username"
			bind:value={username}
			class="input input-bordered w-full max-w-xs"
		/>
		<input
			type="password"
			name="password"
			placeholder="Password"
			bind:value={password}
			class="input input-bordered w-full max-w-xs"
		/>
		<button type="submit" class="btn btn-glass">Login</button>
	</form>
	{#each errors as error}
		<pre>{error}</pre>
	{/each}
</div>
