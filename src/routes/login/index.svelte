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
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { post } from '$lib/utils';
	// import { Button, Heading, TextInput } from '@kahi-ui/framework';
	import { onMount } from 'svelte';

	let googleReady = false;
	let mounted = false;

	onMount(() => {
		console.log('RUNNING ON MOUNT');
		mounted = true;
		if (googleReady) {
			console.log('GOOGLE READY IN ON MOUNT');
			displaySignInButton();
		}
	});

	function googleLoaded() {
		console.log('RUNNING GOOGLE LOADED');
		googleReady = true;
		if (mounted) {
			console.log('MOUNTED IN GOOGLE LOADED');
			displaySignInButton();
		}
	}

	function handleCredentialResponse(response) {
		console.log('Encoded JWT ID token: ' + response.credential);
		/**
		 * response.credential:
		 * eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4ZjM4ODM0NjhmYzY1OWFiYjQ0NzVmMzYzMTNkMjI1ODVjMmQ3Y2EiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NTQwNTA1MDAsImF1ZCI6IjQ1OTkzMDAyNzE4OS0xZ2lwNnI4cWR0OHI0anRoYmNub3YzNjNiYnZ2cHZhbi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMTQyNzg5MDE4OTc5MTU0MDMzMSIsImVtYWlsIjoic2hib3dsZXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjQ1OTkzMDAyNzE4OS0xZ2lwNnI4cWR0OHI0anRoYmNub3YzNjNiYnZ2cHZhbi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJTY290dCBCb3dsZXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2dHaE15TE5QQU0tMWFlcEM4VnlfN2lhd2VOOTVVRkZUS3VsMVFDN2c9czk2LWMiLCJnaXZlbl9uYW1lIjoiU2NvdHQiLCJmYW1pbHlfbmFtZSI6IkJvd2xlcyIsImlhdCI6MTY1NDA1MDgwMCwiZXhwIjoxNjU0MDU0NDAwLCJqdGkiOiJkODE3MjlmNzhiZWI2MjI5YWE0YjRlMTNiNjM3OTJkMGEwZDk5NjFlIn0.NLmfQn7ndJSVu02MMkY6R2rInUTs8KtBUkSRoBQ52rg5zKOTYkL-SwTDQsJDD7_JQgLEUxj1xsCsVcPmYffOJJpJEegV_Fg2yK66LPjwvrrw5S9utcOEynYuf3CbLlw2xdbZ76t6vadLvIK355TiKVIidM542lGezeq5hbYbu-Hjqx5mrnrLvDAwNt4NwbrHf81uj9_9Fi5MW770hvVAostQmO8YzWn60TXMhpkuHERp8ZhaFmCJJSCbAuqpkWwYhnRyaNeh1mIqb_ngl-l7aptC8IDNtf-WahhVqFo5SGkRXSn4dfcdlZO6H0Foqxm9quzJ-1RAk8_14-WWzjb8iQ
		 */
	}

	function displaySignInButton() {
		console.log('RUNNING DISPLAY SIGN IN BUTTON');
		google.accounts.id.initialize({
			client_id: '459930027189-1gip6r8qdt8r4jthbcnov363bbvvpvan.apps.googleusercontent.com',
			callback: handleCredentialResponse
		});
		google.accounts.id.renderButton(
			document.getElementById('buttonDiv'),
			{ theme: 'outline', size: 'large' } // customization attributes
		);
		google.accounts.id.prompt(); // also display the One Tap dialog
	}

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

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" on:load={googleLoaded} async defer></script>
</svelte:head>

<svelte:window on:load={googleLoaded} />

<div class="container_">
	<div id="buttonDiv" />
	<div class="card_">
		<h1>Welcome to Airel</h1>
		<!-- <Heading is="h1">Welcome to Airel</Heading> -->
		<form on:submit|preventDefault={loginUser}>
			<input type="text" name="username" placeholder="Username" bind:value={username} />
			<input type="password" name="password" placeholder="Password" bind:value={password} />
			<button type="submit" value="Login" />
			<!-- <TextInput type="text" name="username" placeholder="Username" bind:value={username} />
			<TextInput type="password" name="password" placeholder="Password" bind:value={password} />
			<Button is="input" type="submit" value="Login" /> -->
		</form>
		{#each errors as error}
			<pre>{error}</pre>
		{/each}
	</div>
</div>

<style>
	button {
		width: 100px;
		height: 40px;
	}
	#buttonDiv {
		width: 200px;
		height: 100px;
	}
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
