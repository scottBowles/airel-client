<script>
	import quill from '$lib/actions/quill';

	export let options = { placeholder: 'Write something from outside...' };
	export let html = '<p>Initial content</p>';

	function handleTextChange(e) {
		html = e.detail.html;
	}
</script>

<div class="editor" use:quill={{ options, initialHtml: html }} on:text-change={handleTextChange} />

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
