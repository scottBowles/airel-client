<script lang="ts">
	import { browser } from '$app/environment';

	interface Props {
		html: string;
	}

	let { html }: Props = $props();

	let sanitizedHtml = $state<string>('');

	$effect(() => {
		if (browser) {
			import('dompurify').then((module) => {
				const DOMPurify = module.default;
				sanitizedHtml = DOMPurify.sanitize(html.replace(/\n/g, '<br>'));
			});
		}
	});
</script>

{@html sanitizedHtml}
