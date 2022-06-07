<script>
	import Quill from 'quill';

	export let options = { placeholder: 'Anything goes here...' };
	export let html = '<p>Initial content</p>';

	function quill(node, { options = {}, initialHtml }) {
		const quill = new Quill(node, {
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

		if (initialHtml) {
			const delta = quill.clipboard.convert(initialHtml);
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

		return {
			destroy() {
				const els = document.querySelectorAll("div[class^='ql-']");
				for (const el of els) {
					if (el.parentNode !== null) {
						el.parentNode.removeChild(el);
					}
				}
			}
		};
	}

	function handleTextChange(e) {
		html = e.detail.html;
	}
</script>

<div class="editor" use:quill={{ options, initialHtml: html }} on:text-change={handleTextChange} />

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
