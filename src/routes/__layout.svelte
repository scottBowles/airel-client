<script>
	import '@kahi-ui/framework/dist/kahi-ui.framework.min.css';
	import '@kahi-ui/framework/dist/kahi-ui.theme.default.min.css';

	import NavBar from '$lib/components/NavBar.svelte';
</script>

<div>
	<NavBar />
	<slot />
</div>

<style>
	div {
		background-color: #f5f5f5;
		min-height: 100vh;
		width: 100vw;
	}
</style>
