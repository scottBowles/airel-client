export default function callOnEsc(node: HTMLElement, cb: () => void) {
	const listener = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			cb();
		}
	};
	node.addEventListener('keydown', listener);
	return {
		destroy: () => node.removeEventListener('keydown', listener)
	};
}
