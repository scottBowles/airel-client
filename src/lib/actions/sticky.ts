// https://css-tricks.com/how-to-detect-when-a-sticky-element-gets-pinned/

import type { Action } from 'svelte/action';

type Sticky = Action<
	HTMLDivElement,
	undefined,
	{ onstuck: (e: CustomEvent<{ isStuck: boolean }>) => void }
>;

const sticky: Sticky = (node: HTMLElement) => {
	const intersectionCallback = function (entries: IntersectionObserverEntry[]) {
		const isStuck = entries[0].intersectionRatio < 1;

		node.dispatchEvent(
			new CustomEvent('stuck', {
				detail: { isStuck }
			})
		);
	};

	const observer = new IntersectionObserver(intersectionCallback, { threshold: [1] });

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};

export default sticky;
