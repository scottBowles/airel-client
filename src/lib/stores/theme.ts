import { writable } from 'svelte/store';

function theme() {
	const store = writable('');
	return store;
}

export default theme();
