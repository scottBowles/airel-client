<script lang="ts">
	import { browser } from '$app/environment';
	import type { QuillOptions } from 'quill';
	import { onDestroy, onMount } from 'svelte';
	import DOMPurify from 'dompurify';

	interface Props {
		options?: QuillOptions;
		init?: string;
	}

	let {
		options = { placeholder: 'Anything goes here...' },
		init = '<p>Initial content</p>'
	}: Props = $props();

	let node: HTMLElement | undefined = $state();
	let html = $state(init);

	onMount(async () => {
		if (!node) return;

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

		quill.clipboard.addMatcher(Node.ELEMENT_NODE, function (_node, delta) {
			delta.forEach((e) => {
				if (e.attributes) {
					e.attributes.color = '';
					e.attributes.background = '';
				}
			});
			return delta;
		});

		const container = node.getElementsByClassName('ql-editor')[0];

		quill.on('text-change', function (/*delta, oldDelta, source*/) {
			html = container.innerHTML;
		});
	});

	onDestroy(() => {
		if (browser && document) {
			const els = document.querySelectorAll("div[class^='ql-']");
			for (const el of els) {
				if (el.parentNode !== null) {
					el.parentNode.removeChild(el);
				}
			}
		}
	});

	// Sanitize assistant response before rendering
	function sanitizeResponse(response: string): string {
		// Replace newlines with <br> before sanitizing
		return DOMPurify.sanitize(response.replace(/\n/g, '<br>'));
	}
</script>

<div class="editor" bind:this={node}>
	{@html sanitizeResponse(init)}
</div>
<textarea name="markdownNotes" bind:value={html} hidden></textarea>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
