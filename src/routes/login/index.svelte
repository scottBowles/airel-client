<script context="module" lang="ts">
	export async function load({ session }) {
		if (session.isLoggedIn) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {};
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { post } from '$lib/utils';
	import { session } from '$app/stores';

	let username;
	let password;
	let errors;
	let token;
	let user;

	async function loginUser() {
		const response = await post(`endpoints/login`, { username, password });
		console.log({ response });
		$session.token = response.token;
		$session.isLoggedIn = true;
		goto('/');
		// const res = await login({ variables: { username, password } });
		// const {
		// 	tokenAuth: { payload, token },
		// 	errors
		// } = res;

		// const { auth_token, non_field_errors } = json;
		// if (res.ok) {
		// 	token = auth_token;
		// 	fetchUser();
		// 	goto('/');
		// } else {
		// 	errors = non_field_errors.join('\n');
		// }
	}

	// async function fetchUser() {
	// 	const res = await api.get('auth/users/me/', token);
	// 	const json = await res.json();
	// 	user = JSON.stringify(json);
	// }
</script>

<div>
	<form on:submit|preventDefault={loginUser}>
		<input type="text" name="username" placeholder="Username" bind:value={username} />
		<input type="password" name="password" placeholder="Password" bind:value={password} />
		<button type="submit">Login</button>
	</form>
	<h4>{errors}</h4>
	<h4>User: {user}</h4>
</div>
