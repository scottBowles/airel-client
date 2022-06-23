<script>
	import { browser } from '$app/env';
	import { onDestroy, onMount } from 'svelte';

	export let options = { placeholder: 'Anything goes here...' };
	export let html = '<p>Initial content</p>';
	let node;

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
			placeholder: 'Type something...',
			theme: 'snow', // or 'bubble'
			...options
		});

		quill.clipboard.addMatcher(Node.ELEMENT_NODE, function (node, delta) {
			delta.forEach((e) => {
				if (e.attributes) {
					e.attributes.color = '';
					e.attributes.background = '';
				}
			});
			return delta;
		});

		if (html) {
			const delta = quill.clipboard.convert(html);
			quill.setContents(delta);
		}

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

	function handleTextChange(e) {
		html = e.detail.html;
	}
</script>

<div class="editor" bind:this={node} on:text-change={handleTextChange} />

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
