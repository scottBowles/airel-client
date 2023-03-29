import { writable } from 'svelte/store';

function initThemeStore() {
	const store = writable('');
	return store;
}

export type Theme = ReturnType<typeof initThemeStore>;

export default initThemeStore;
