import { writable } from 'svelte/store';

function initThemeStore(initialValue = 'dark') {
	const store = writable(initialValue);
	return store;
}

export type Theme = ReturnType<typeof initThemeStore>;

export default initThemeStore;
