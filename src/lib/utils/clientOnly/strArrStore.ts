import { uniq } from 'ramda';
import { writable } from 'svelte/store';

const uniqStrArrStore = (init = [] as string[]) => {
	const { subscribe, set, update } = writable<string[]>(init);

	const add = (str: string) => update((arr) => uniq([...arr, str]));
	const remove = (str: string) => update((arr) => arr.filter((s) => s !== str));
	const clear = () => set([]);

	return { subscribe, set, update, add, remove, clear };
};

export default uniqStrArrStore;
