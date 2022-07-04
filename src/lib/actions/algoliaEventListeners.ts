import { showAlgoliaSearch } from '$lib/stores';
import { navigating } from '$app/stores';

export function algoliaCloseOnNavigation(_node: HTMLElement) {
	/** CLOSE ON PAGE CHANGE */
	const unsubscribeFromNavigating = navigating.subscribe((navigating) => {
		if (navigating) showAlgoliaSearch.close();
	});

	return {
		destroy: unsubscribeFromNavigating
	};
}

export function algoliaEventListeners(_node: HTMLElement) {
	/**
	 * OPEN ON CMD/CTRL + K
	 * CLOSE ON ESCAPE
	 */
	function searchEventListener(event) {
		if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
			showAlgoliaSearch.open();
		}
		if (event.key === 'Escape') {
			showAlgoliaSearch.close();
		}
	}

	function addEventListeners() {
		try {
			document.addEventListener('keydown', searchEventListener);
		} catch (e) {
			console.error(e);
		}
	}

	function removeEventListeners() {
		try {
			document.removeEventListener('keydown', searchEventListener);
		} catch (e) {
			console.error(e);
		}
	}

	addEventListeners();

	return {
		destroy: removeEventListeners
	};
}
