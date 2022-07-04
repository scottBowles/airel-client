import { writable } from 'svelte/store';

/**
 * Used for desktop search. This allows us to have a custom button and shortkey
 * event listeners to open the search box programmatically.
 * On mobile, we instead use the search bar from Algolia that opens on touch
 * and uses a full screen, mobile-style ui.
 */

function showAlgoliaSearch() {
	const store = writable(false);
	return {
		...store,
		close: () => store.set(false),
		open: () => store.set(true)
	};
}

export default showAlgoliaSearch();
