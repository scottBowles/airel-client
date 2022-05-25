type Item = {
	name: string;
	description?: string;
	markdownNotes?: string;
	imageIds?: string[];
	lockUser?: { username: string };
	lockedBySelf?: boolean;
	armor?: { acBonus: number };
	equipment?: { briefDescription: string };
	weapon?: { attackBonus: number };
};

export const emptyItem: Item = {
	name: '',
	description: '',
	markdownNotes: '',
	imageIds: [],
	lockUser: { username: 'Loading' },
	lockedBySelf: false,
	armor: null,
	equipment: null,
	weapon: null
};
