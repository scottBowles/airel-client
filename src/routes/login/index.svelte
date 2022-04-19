<!-- <script context="module" lang="ts">
	export async function load({ session }) {
		console.log('login page', { session });
		if (session.isLoggedIn) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {};
	}
</script> -->
<script lang="ts">
	import { Button, Heading, TextInput } from '@kahi-ui/framework';

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
		console.log({ response });
		if (response.errors) {
			$session.token = null;
			$session.isLoggedIn = false;
			errors = response.errors.map((error) => error.message);
		} else {
			$session.token = response.tokenAuth.token;
			$session.isLoggedIn = true;
			goto('/');
		}
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

<div class="container_">
	<div class="card_">
		<Heading is="h1">Welcome to Airel</Heading>
		<form on:submit|preventDefault={loginUser}>
			<TextInput type="text" name="username" placeholder="Username" bind:value={username} />
			<TextInput type="password" name="password" placeholder="Password" bind:value={password} />
			<Button is="input" type="submit" value="Login" />
		</form>
		{#each errors as error}
			<pre>{error}</pre>
		{/each}
	</div>
</div>

<style>
	.container_ {
		height: 100vh;
		width: 100vw;
		display: grid;
		place-items: center;
	}

	.card_ {
		display: grid;
		place-items: center;
		gap: 16px;
		width: 320px;
		max-width: 76%;
	}
	form {
		width: 100%;
		display: grid;
		gap: 8px;
	}
</style>
