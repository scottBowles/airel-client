<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	const login_uri = 'http://localhost:5173/endpoints/google_auth?' + $page.url.searchParams;

	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://accounts.google.com/gsi/client';
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);
		return () => {
			document.body.removeChild(script);
		};
	});
</script>

<div
	id="g_id_onload"
	data-client_id="663709274997-73tvumrgtdluvolar09ifg9vcehrdfcg.apps.googleusercontent.com"
	data-context="signin"
	data-ux_mode="popup"
	data-login_uri={login_uri}
	data-auto_select="true"
	data-itp_support="true"
/>

<div
	class="g_id_signin"
	data-type="standard"
	data-shape="rectangular"
	data-theme="outline"
	data-text="signin_with"
	data-size="large"
	data-logo_alignment="left"
	style="z-index: 1000"
/>
