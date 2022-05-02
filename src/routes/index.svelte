<script>
	import Thumbnail from '$lib/components/Thumbnail.svelte';
	import CloudinaryUpload from '$lib/components/CloudinaryUpload.svelte';

	console.log('index.svelte script');
	function handleImageUpload(error, result) {
		console.log('handleImageUpload', { error, result });
	}

	let rawData = '';
</script>

<h1 class="uppercase">Home</h1>
<Thumbnail thumbnailId="sample" />
<form class="form">
	<textarea
		type="text"
		bind:value={rawData}
		class="markdown-input"
		placeholder="Enter your markdown content here..."
	/>
	<button class="show-btn" on:click={() => ({})}> Show Preview </button>
</form>
<CloudinaryUpload {handleImageUpload}>
	<button type="button">Upload an image</button>
</CloudinaryUpload>
