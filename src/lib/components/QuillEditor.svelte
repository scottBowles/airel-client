<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';

	export let options = { placeholder: 'Anything goes here...' };
	export let init = '<p>Initial content</p>';

	let node: HTMLElement;
	let html = init;

	onMount(async () => {
		const { default: Quill } = await import('quill');

		let quill = new Quill(node, {
			modules: {
				toolbar: [
					[{ header: [1, 2, 3, false] }],
					['bold', 'italic', 'underline', 'strike'],
					['link', 'code-block']
				]
			},
			theme: 'snow', // or 'bubble'
			...options
		});

		quill.clipboard.addMatcher(Node.ELEMENT_NODE, function (node: any, delta: any) {
			delta.forEach((e: any) => {
				if (e.attributes) {
					e.attributes.color = '';
					e.attributes.background = '';
				}
			});
			return delta;
		});

		const container = node.getElementsByClassName('ql-editor')[0];

		quill.on('text-change', function (/*delta, oldDelta, source*/) {
			node.dispatchEvent(
				new CustomEvent('text-change', {
					detail: {
						html: container.innerHTML,
						text: quill.getText(),
						contents: quill.getContents()
					}
				})
			);
		});
	});

	onDestroy(() => {
		if (node) {
			node.removeEventListener('text-change', handleTextChange);
		}
		if (browser && document) {
			const els = document.querySelectorAll("div[class^='ql-']");
			for (const el of els) {
				if (el.parentNode !== null) {
					el.parentNode.removeChild(el);
				}
			}
		}
	});

	function handleTextChange(e: any) {
		html = e.detail.html;
	}
</script>

<div class="editor" bind:this={node} on:text-change={handleTextChange}>
	{@html init}
</div>
<textarea name="markdownNotes" bind:value={html} hidden />

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
