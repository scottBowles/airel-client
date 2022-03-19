<script>
	import Thumbnail from '$lib/components/Thumbnail.svelte';

	let rawData = '';
</script>

<h1 class="uppercase">Home</h1>
<Thumbnail />
<form class="form">
	<textarea
		type="text"
		bind:value={rawData}
		class="markdown-input"
		placeholder="Enter your markdown content here..."
	/>
	<button class="show-btn" on:click={() => ({})}> Show Preview </button>
</form>
